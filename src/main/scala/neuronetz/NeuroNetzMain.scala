package neuronetz

import akka.actor.{ActorSystem, Props}


object NeuroNetzMain extends App {
  val system = ActorSystem()
  system.actorOf(Props(new NeuroNetzActor), "neuro-netz")
}
