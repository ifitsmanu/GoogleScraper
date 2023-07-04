import ResultsList from "@/components/ResultsList";

export const revalidate = 300;

type Props = {
  searchParams: {
    q: string;
  };
  params: {};
};

async function SearchPage(props: Props) {
  const {
    searchParams: { q },
  } = props;

  if (!q) {
    return <div>Search for something</div>;
  }

  console.log("FETCHING");

  const response = await fetch(
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL!
      : "http://localhost:3000/api/search",
    {
      method: "POST",
      body: JSON.stringify({ searchTerm: q }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  const results: PageResult[] = data;

  return (
    <div>
      <ResultsList results={results} />
    </div>
  );
}

export default SearchPage;
