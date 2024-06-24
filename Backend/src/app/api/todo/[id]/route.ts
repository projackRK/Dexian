import { NextRequest, NextResponse } from "next/server";
import data from "@/utils";
import { ITodo } from "@/interface/todo";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const todos = data.readData();
  const todo = await todos.find((t: ITodo) => t.id === Number(id));

  if (!todo) {
    return NextResponse.json({
      status: 404,
      message: `not found todo ${id}.`,
    });
  }
  return NextResponse.json({
    status: 200,
    message: "get todo success.",
    data: todo,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const updatedTodo = await req.json();
  let todos = data.readData();
  const todo = await todos.find((t: ITodo) => t.id === Number(id));

  if (!todo) {
    return NextResponse.json({
      status: 404,
      message: `not found todo ${id}.`,
    });
  }
  todos = await todos.map((todo: ITodo) =>
    todo.id === Number(id) ? { ...todo, ...updatedTodo } : todo
  );
  data.writeData(todos);

  return NextResponse.json({
    status: 200,
    message: "update todo success.",
    data: updatedTodo,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  let todos = data.readData();
  const todo = await todos.find((t: ITodo) => t.id === Number(id));

  if (!todo) {
    return NextResponse.json({
      status: 404,
      message: `not found todo ${id}.`,
    });
  }

  todos = todos.filter((todo: ITodo) => todo.id !== Number(id));
  data.writeData(todos);

  return NextResponse.json({
    status: 200,
    message: "delete todo success.",
    data: id,
  });
}
