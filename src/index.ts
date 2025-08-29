import questions from "../questions.json" with { type: "json" };

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      if (!questions || questions.length === 0) {
        return new Response(JSON.stringify({ error: "No questions found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const randomIndex = Math.floor(Math.random() * questions.length);
      return new Response(JSON.stringify(questions[randomIndex]), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

console.log("✅ Worker ready!");