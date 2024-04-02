import Fastify from "fastify";
import pointOfView from "@fastify/view";
import handlebars from "handlebars";
import path from "path";

const fastify = Fastify({
  logger: true,
});

fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  root: path.join("src", "templates"),
  // propertyName: "render",
  // layout: "./templates/layout.hbs",
  // options: {
  //   partials: {
  //     header: 'header.hbs',
  //     footer: 'footer.hbs'
  //   }
  // }
});

fastify.get("/", function getHomePage(req, reply) {
  reply.view("./demo.hbs");
});

fastify.get("/html", function getHomePage(req, reply) {
  reply.view("./homepage.html");
});

fastify.get("/json", function getHelloWorld(req, reply) {
  return { hello: "world" };
});

fastify.listen({port: 3000}, function runServer(err, address){
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info('Server now listening on port 3000')
})