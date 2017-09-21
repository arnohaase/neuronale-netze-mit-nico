package neuronetz

import akka.actor.Actor
import neuronetz.http.HttpServer
import neuronetz.http.HttpServer.HttpServerConfig


class NeuroNetzActor extends Actor {
  context.actorOf(HttpServer.props(HttpServerConfig("0.0.0.0", 8123)))
  override def receive = Actor.emptyBehavior
}
