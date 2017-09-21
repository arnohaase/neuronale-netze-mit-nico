package neuronetz.util

import akka.http.scaladsl.marshalling.{Marshaller, ToEntityMarshaller}
import akka.http.scaladsl.model.MediaTypes.`application/json`
import akka.http.scaladsl.server.{RejectionError, ValidationRejection}
import akka.http.scaladsl.unmarshalling.{FromEntityUnmarshaller, Unmarshaller}
import akka.util.ByteString
import play.api.libs.json._

/**
  * Based on hseebergers PlayJsonSupport but without requiring 'application/json'
  */
object PlayJsonSupport extends PlayJsonSupport {

  final case class PlayJsonError(error: JsError) extends RuntimeException {
    override def getMessage: String =
      JsError.toJson(error).toString()
  }
}

/**
  * Automatic to and from JSON marshalling/unmarshalling using an in-scope *play-json* protocol.
  */
trait PlayJsonSupport {
  import PlayJsonSupport._

  private val jsonStringUnmarshaller =
    Unmarshaller.byteStringUnmarshaller
      //      .forContentTypes(`application/json`)
      .mapWithCharset {
      case (ByteString.empty, _) => throw Unmarshaller.NoContentException
      case (data, charset)       => data.decodeString(charset.nioCharset.name)
    }

  private val jsonStringMarshaller = Marshaller.stringMarshaller(`application/json`)

  /**
    * HTTP entity => `A`
    *
    * @tparam A type to decode
    * @return unmarshaller for `A`
    */
  implicit def unmarshaller[A: Reads]: FromEntityUnmarshaller[A] = {
    def read(json: JsValue) =
      implicitly[Reads[A]]
        .reads(json)
        .recoverTotal { e =>
          throw RejectionError(
            ValidationRejection(JsError.toJson(e).toString, Some(PlayJsonError(e)))
          )
        }
    jsonStringUnmarshaller.map(data => read(Json.parse(data)))
  }

  /**
    * `A` => HTTP entity
    *
    * @tparam A type to encode
    * @return marshaller for any `A` value
    */
  implicit def marshaller[A: Writes]: ToEntityMarshaller[A] =
    jsonStringMarshaller.compose(Json.prettyPrint).compose(implicitly[Writes[A]].writes)
}
