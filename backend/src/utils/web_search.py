# https://pypi.org/project/duckduckgo-search/
# pip3 install -U duckduckgo_search


from duckduckgo_search import DDGS

# Using DDGS and AsyncDDGS classes to retrieve search results from DuckDuckGo.com.
from typing import List, Optional


class WebSearch:
    @staticmethod
    def get_web_search_results(
        search_query: str, max_results: Optional[int] = 5
    ) -> List:
        """
        Retrieve search results from duckduckgo.com.

        Parameters:
            search_query (str): Search query to retrieve results for
            max_results Optional[int]: Maximum number of search results to retrieve (default 5).

        Returns:
            List of dictionaries containing the title, URL, and description of each search result.
        """

        with DDGS() as ddgs:
            results = [r for r in ddgs.text(search_query, max_results=max_results)]
        return results

    @staticmethod
    def web_search_text(search_query: str, max_results: Optional[int] = 5) -> List:
        """
        Search for text on duckduckgo.com

        Args:
            search_query (str): The text to search for.
            max_results Optional[int]: The maximum number of search results to retrieve (default 10).

        Returns:
            List of search results as strings.
        """

        with DDGS() as ddgs:
            results = [
                r
                for r in ddgs.text(
                    search_query,
                    region="wt-wt",
                    safesearch="off",
                    timelimit="y",
                    max_results=max_results,
                )
            ]
        return results

    @staticmethod
    def web_search_pdf(search_query: str, max_results: Optional[int] = 5) -> List:
        """
        Search for PDF files on duckduckgo.com.

        Args:
            search_query (str): The text to search for.
            max_results Optional[int]: The maximum number of search results to retrieve (default 10).

        Returns:
            List of search results as dictionaries containing the title, URL, and description of each PDF file.
        """
        # Searching for pdf files
        with DDGS() as ddgs:
            results = [
                r
                for r in ddgs.text(
                    f"{search_query}:pdf",
                    region="wt-wt",
                    safesearch="off",
                    timelimit="y",
                    max_results=max_results,
                )
            ]
        return results

    @staticmethod
    def get_instant_web_answer(search_query: str) -> List:
        """
        Use answer() to get instant answers from DuckDuckGo.com search

        Args:
            search_query (str): The text to search for.

        Returns:
            List of instant answers as strings.
        """
        with DDGS() as ddgs:
            results = [r for r in ddgs.answers(search_query)]
        return results

    @staticmethod
    def web_search_image(keywords: str, max_results: Optional[int] = 5) -> List:
        """
        Search for images on DuckDuckGo.com.

        Args:
            keywords (str): The keywords to search for.
            max_results Optional[int]: The maximum number of search results to retrieve (default 100).

        Returns:
            List of search results as dictionaries containing the title, URL, and image URL of each image.

        """

        with DDGS() as ddgs:
            ddgs_images_gen = ddgs.images(
                keywords,
                region="us-en",
                safesearch="on",
                size=None,
                color=None,
                type_image=None,
                layout=None,
                license_image=None,
                max_results=max_results,
            )
            # print(ddgs_images_gen)
            results = [r for r in ddgs_images_gen]
            return results

    @staticmethod
    def web_search_video(keywords: str, max_results: Optional[int] = 5) -> List:
        """
        Search for videos on DuckDuckGo.com.

        Args:
            keywords (str): The keywords to search for.
            max_results Optional[int]: The maximum number of search results to retrieve (default 100).

        Returns:
            List of search results as dictionaries containing the title, URL, and thumbnail URL of each video.
        """
        with DDGS() as ddgs:
            ddgs_videos_gen = ddgs.videos(
                keywords,
                region="wt-wt",
                safesearch="off",
                timelimit="w",
                resolution="high",
                duration="medium",
                max_results=max_results,
            )
            results = [r for r in ddgs_videos_gen]
        return results

    @staticmethod
    def web_search_news(keywords: str, max_results: Optional[int] = 5) -> List:
        """
        Search for news articles on DuckDuckGo.com.

        Args:
            keywords (str): The keywords to search for.
            max_results Optional[int]: The maximum number of search results to retrieve (default 20).

        Returns:
            List of search results as dictionaries containing the title, URL, and snippet of each news article.
        """

        with DDGS() as ddgs:
            ddgs_news_gen = ddgs.news(
                keywords,
                region="wt-wt",
                safesearch="off",
                timelimit="m",
                max_results=max_results,
            )
            results = [r for r in ddgs_news_gen]
        return results

    @staticmethod
    def web_search_map(
        search_query: str, place: str = "Ottawa", max_results: Optional[int] = 5
    ):
        """
        Search for maps on DuckDuckGo.com.

        Args:
            search_query (str): The text to search for.
            place (str): The location to search for maps of (default "ottawa").
            max_results Optional[int]: The maximum number of search results to retrieve (default 50).

        Returns:
            List of search results as dictionaries containing the title, URL, and image URL of each map.
        """
        with DDGS() as ddgs:
            results = [
                r for r in ddgs.maps(search_query, place=place, max_results=max_results)
            ]
        return results

    @staticmethod
    def give_web_search_suggestion(search_query):
        """
        Retrieve search suggestions from DuckDuckGo.com.

        Args:
            search_query (str): The text to retrieve suggestions for.

        Returns:
            List of search suggestions as strings.
        """
        with DDGS() as ddgs:
            results = [r for r in ddgs.suggestions(search_query)]
        return results

    @staticmethod
    def user_proxy_for_text_web_search(
        search_query: str, timeout: Optional[int] = 20, max_results: Optional[int] = 5
    ):
        """
        Search for text on DuckDuckGo.com using a user-defined proxy.
        Easiest way: launcing a TOR browser socks5://localhost:9150

        Args:
            search_query (str): The text to search for.
            timeout Optional[int]: The timeout for the request in seconds (default 20).
            max_results Optional[int]: The maximum number of search results to retrieve (default 50).

        Returns:
            List of search results as strings.
        """
        with DDGS(proxies="socks5://localhost:9150", timeout=timeout) as ddgs:
            results = [r for r in ddgs.text(search_query, max_results=max_results)]
        return results
