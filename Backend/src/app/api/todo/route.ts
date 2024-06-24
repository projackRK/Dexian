import { NextRequest, NextResponse } from "next/server";
import data from "@/utils";

export async function GET() {
  const todos = data.readData();
  return NextResponse.json({
    status: 200,
    message: "get todos success.",
    data: todos,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  let todos = data.readData();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: data.title,
    completed: data.completed,
  };
  todos.push(newTodo);
  data.writeData(todos);
  return NextResponse.json({
    status: 200,
    message: "create todos success.",
    data: newTodo,
  });
}
