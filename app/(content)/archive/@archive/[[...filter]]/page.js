import Link from "next/link";
import NewsList from "@/components/news-list";
import {
  getNewsForYear,
  getAvailableNewsYears,
  getAvailableNewsMonths,
  getNewsForYearAndMonth,
} from "@/lib/news";

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  let news;
  let links = await getAvailableNewsYears();
  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }
  let newsContent = <p>No news found</p>;
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  const availableYears = await !getAvailableNewsYears();
  if (
    (selectedYear && availableYears.includes(selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonths().includes(selectedMonth))
  ) {
    throw new Error("Insvalid Filter");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
  // const newsYear = getNewsForYear(year);

  // return <NewsList news={newsYear} />;
}
