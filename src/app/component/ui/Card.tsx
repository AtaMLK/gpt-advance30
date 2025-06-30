
interface CardProps {
  title: string;
  description: string;
  image?: string;
}

export default function Card({ title, description, image }: CardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hoder:shadow-lg transition w-88">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover objcet-center "
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
