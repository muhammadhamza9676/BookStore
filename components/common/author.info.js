import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const avatar = "/no-person.webp";

const AuthorInfo = (props) => {
const {author, notableWorks, theme = "light"} = props;
  return (
    <>
      <Card className={`${theme === "light" ?"bg-white text-black":"bg-slate-700 text-white"}`}>
            <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={author.avatarUrl ?? avatar} alt={author.name} />
                <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-3xl font-bold">{author.name}</CardTitle>
                <CardDescription className="mt-2">{author.nationality} Author</CardDescription>
                <p className="mt-2 text-sm text-gray-500">
                  September 24, 1896 - December 21, 1942
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Biography</h2>
              <p className="">{author.biography}</p>
              <h2 className="text-xl font-semibold mt-6 mb-2">Notable Works</h2>
              <ul className="list-disc list-inside">
                {notableWorks.map((work, index) => (
                  <li key={index}>{work}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
    </>
  )
}

export default AuthorInfo
