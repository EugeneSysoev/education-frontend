import { useQuery } from "@tanstack/react-query";
import { getTopStories } from "./api";

export function HackerNewsApp() {
  const storiesQuery = useQuery({
    queryKey: ["top-stories"],
    queryFn: getTopStories,
    retry: false,
  });

  if (storiesQuery.isPending) {
    return <p>Загрузка публикаций…</p>;
  }

  if (storiesQuery.isError) {
    return (
      <>
        {<p>Ошибка: {storiesQuery.error.message}</p>}
        {
          <button
            type="button"
            onClick={() => {
              storiesQuery.refetch();
            }}
          >
            Повторить
          </button>
        }
      </>
    );
  }

  if (storiesQuery.data.length === 0) {
    return <p>Публикаций пока нет</p>;
  }

  return (
    <>
      <ul>
        {storiesQuery.data.map((story) => (
          <li key={story.id}>
            <h2>{story.title}</h2>
            <p>{story.score}</p>
            <p>{story.by}</p>
            {story.url ? (
              <a href={story.url}>{story.url}</a>
            ) : (
              <p>Внешней ссылки нет</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
