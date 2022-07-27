// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  style: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // declaring all possible styles
  var p1 = [
    "background-color: #fff;background: linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%);",
    "background-color: rgb(250, 222, 222); background: linear-gradient(239.26deg, #d6eaff 63.17%, #f4ffde 94.92%);",
    "background: linear-gradient(250deg, rgba(255,240,41,0.9143934917717087) 0%, rgba(176,234,247,1) 100%);",
    "background: radial-gradient(circle, rgba(238,174,202,1) 9%, rgba(238,166,238,1) 15%, rgba(191,123,255,1) 31%, rgba(206,172,237,1) 48%, rgba(162,214,228,1) 72%, rgba(148,187,233,1) 98%);",
  ];

  // pick a random style
  var style = p1[Math.floor(Math.random() * p1.length)];

  // return the style
  res.status(200).json({ style: style });
}
