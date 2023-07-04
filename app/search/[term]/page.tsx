import ResultsList from "@/components/ResultsList";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

async function SearchPage(props: Props) {
  const {
    params: { term },
  } = props;

  if (!term) {
    redirect("/");
  }

  const response = await fetch(getFetchUrl("api/search"), {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...props.searchParams }),
  });

  const data = await response.json();

  const results: PageResult[] = data;

  return (
    <div>
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;
