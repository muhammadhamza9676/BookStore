
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book } from "lucide-react";
import { useTheme } from "@/theme.provider";

const BookCard = ({ book, imagePath }) => {
  const { theme } = useTheme();
  return (
    <Card key={book.id} className={`flex flex-col justify-between ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white border-gray-700"}`}>
      <CardHeader>
        <img src={imagePath} alt={book.title} className="w-full h-64 object-cover rounded-sm" />
        <CardTitle className="text-xl mt-4">{book.title}</CardTitle>
      </CardHeader>
      {/* <CardContent>
        <p className="text-sm text-gray-600">{book.author}</p>
      </CardContent> */}
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">${book?.price}</span>
        <Link href={`/books/${book.id}`} passHref>
          <Button className="w-full">
            <Book className="mr-2 h-4 w-4" /> View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
