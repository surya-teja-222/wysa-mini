// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type definition for the data returned by the API
type Data = {
  msg: string[];
  from: "sys"[] | "usr"[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // array of default messages
  var p1: string[] = [
    "Hello👋",
    "I'm Wysa -an AI chatbot built by therapists",
    "I'm here to understand your concerns and connect you with the best resources available to support you.",
    "Can I Help ? 😊",
  ];

  // setting messages as sent by system
  var p2: "sys"[] | "usr"[] = ["sys", "sys", "sys", "sys"];

  // creating the data object to be returned
  var data: Data = {
    msg: p1,
    from: p2,
  };

  // sending the data back to the client
  res.status(200).json(data);
}
