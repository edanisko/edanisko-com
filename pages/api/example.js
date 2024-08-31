export default function handler(req, res) {
  res.status(200).json({ text: "yo" });
}

export async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

// handling form input data
// export default function handler(req, res) {
//   const email = req.body.email;
//   // Then save email to your database, etc...
//   res.status(200).json({ text: "Success" });
// }
