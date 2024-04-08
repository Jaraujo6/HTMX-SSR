import Fastify from "fastify";
import pointOfView from "@fastify/view";
import staticFiles from "@fastify/static";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true,
});

fastify.register(pointOfView, {
  engine: {
    handlebars,
  },
  root: path.join(__dirname, "templates"),
  // layout: "./templates/layout.hbs",
  // options: {
  //   partials: {
  //     header: 'header.hbs',
  //     footer: 'footer.hbs'
  //   }
  // }
});

fastify.register(staticFiles, {
  root: path.join(__dirname, "static"),
  prefix: "/static",
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