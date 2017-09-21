package neuronetz.http

import akka.Done
import akka.actor.Status.Failure
import akka.actor.{Actor, ActorLogging, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.Http.ServerBinding
import akka.http.scaladsl.server.Route
import akka.stream.ActorMaterializer
import akka.util.Timeout
import neuronetz.http.HttpServer.HttpServerConfig
import akka.pattern.pipe
import neuronetz.frontendconfig.FrontendConfig
import play.api.libs.json.Json

import scala.concurrent.duration._

object HttpServer {
  def name = "http-server"
  def props(config: HttpServerConfig) = Props(new HttpServer(config))

  case class HttpServerConfig(host: String, port: Int)
}

class HttpServer(config: HttpServerConfig) extends Actor with ActorLogging {
  import context.dispatcher
  implicit val mat = ActorMaterializer()

  implicit val timeout: Timeout = 10.seconds

  log.debug(s"Binding HTTP server to ${config.host}:${config.port}")
  Http(context.system)
    .bindAndHandle (route, config.host, config.port)
    .pipeTo(self)

  var serverBinding: Option[ServerBinding] = None

  override def receive = {
    case msg@ServerBinding(address) =>
      log.info (s"Bound to $address")
      serverBinding = Some(msg)
    case Failure(th) =>
      log.error(th, s"Failed to bind to ${config.host}:${config.port}")
      context.stop(self)
  }


  private def route: Route = {
    import akka.http.scaladsl.server.Directives._
    import neuronetz.util.PlayJsonSupport._

    implicit val frontendConfigFormat = Json.format[FrontendConfig]


    path("config") {get {complete(FrontendConfig("ever", "else"))}} ~
    pathPrefix("static") {get {getFromResourceDirectory("static")}} ~
    get {getFromResource("index.html")}
  }
}
