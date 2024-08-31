import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getStortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  /**
    fetch or ajax call...
    const res = await fetch('...');
    const post await res.json();
    return ppoast.map((post)  => {
      return {
        params: {
          id: post.id
        },
        revalidate: 10 // revalidate: dataChanged ? 10 : false
      }
    }) 
   */

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContect = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContect.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
