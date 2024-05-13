import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true});

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, Reino Unido" },
  { id: 2, name: "Mercedes", base: "Brackley, Reino Unido" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, Reino Unido" },
  { id: 4, name: "Ferrari", base: "Maranello, Itália" },
  { id: 5, name: "Alpine", base: "Enstone, Reino Unido" },
  { id: 6, name: "AlphaTauri", base: "Faenza, Itália" },
  { id: 7, name: "Aston Martin", base: "Silverstone, Reino Unido" },
  { id: 8, name: "Alfa Romeo Racing", base: "Hinwil, Suíça" },
  { id: 9, name: "Williams Racing", base: "Grove, Reino Unido" },
  { id: 10, name: "Haas F1 Team", base: "Kannapolis, EUA" },
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "Fernando Alonso", team: "Alpine" },
  { id: 6, name: "Pierre Gasly", team: "AlphaTauri" },
  { id: 7, name: "Sebastian Vettel", team: "Aston Martin" },
  { id: 8, name: "Kimi Räikkönen", team: "Alfa Romeo Racing" },
  { id: 9, name: "George Russell", team: "Williams Racing" },
  { id: 10, name: "Nikita Mazepin", team: "Haas F1 Team" },
];

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);
    return[{ teams }];

});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);
    return[{ drivers }];
});

interface DriverParams {
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id",async(request, response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id );

    if(!driver){
        response.type("application/json").code(404);
        return { message:"Driver Not Found" };
    } else {
        response.type("application/json").code(200);
        return { driver };
    }
});


server.listen({ port: 3333 }, () => {
    console.log("Sever init");
});