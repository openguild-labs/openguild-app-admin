"use client";
import { INTENT_BASE_URL, intentTypes } from "@/constants/twitter";
import { TIntentState } from "@/redux/slides/intentLinkParams";
import { usePathname, useSearchParams as useNextSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const getIntentLink = (intentState: TIntentState) => {
  const { type, params } = intentState;
  const url = `${INTENT_BASE_URL}/${type}`;
  let paramsObj = {};
  switch (type) {
    case intentTypes.tweet:
      if (params.text !== "") {
        paramsObj = {
          ...paramsObj,
          text: params.text,
        };
      }

      if (params.hashtags.length > 0) {
        paramsObj = {
          ...paramsObj,
          hashtags: params.hashtags.join(","),
        };
      }

      break;
    case intentTypes.follow:
      if (params.screenName !== "") {
        paramsObj = {
          ...paramsObj,
          screen_name: params.screenName,
        };
      }

      if (params.userID !== "") {
        paramsObj = {
          ...paramsObj,
          user_id: params.userID,
        };
      }

      break;
    case intentTypes.retweet:
      if (params.tweetID !== "") {
        paramsObj = {
          ...paramsObj,
          tweet_id: params.tweetID,
        };
      }
      break;
    case intentTypes.like:
      if (params.tweetID !== "") {
        paramsObj = {
          ...paramsObj,
          tweet_id: params.tweetID,
        };
      }
      break;
    case intentTypes.reply:
      if (params.tweetID !== "") {
        paramsObj = {
          ...paramsObj,
          tweet_id: params.tweetID,
        };
      }
      break;
    default:
      break;
  }

  const isParamsEmpty = Object.keys(paramsObj).length === 0;
  if (isParamsEmpty) {
    return url;
  }

  const fParams = new URLSearchParams(paramsObj).toString();
  return `${url}?${fParams}`;
};

export const parseIntentLink = (link: string) => {
  const url = new URL(link);
  const type = url.pathname.split("/")[2];
  const params = url.searchParams;
  let paramsObj = {};
  switch (type) {
    case intentTypes.tweet:
      paramsObj = {
        text: params.get("text") || "",
        hashtags: params.get("hashtags")?.split(",") || [],
      };
      break;
    case intentTypes.follow:
      paramsObj = {
        screenName: params.get("screen_name") || "",
        userID: params.get("user_id") || "",
      };
      break;
    case intentTypes.retweet:
      paramsObj = {
        tweetID: params.get("tweet_id") || "",
      };
      break;
    case intentTypes.like:
      paramsObj = {
        tweetID: params.get("tweet_id") || "",
      };
      break;
    case intentTypes.reply:
      paramsObj = {
        tweetID: params.get("tweet_id") || "",
      };
      break;
    default:
      break;
  }

  return {
    type,
    params: paramsObj,
  };
};

export const isIntentLink = (link: string) => {
  // check if not a url
  if (!link.startsWith("http") && !link.startsWith("https")) {
    return false;
  }

  const url = new URL(link);

  if (url.origin + "/intent" !== INTENT_BASE_URL) {
    return false;
  }

  const type = url.pathname.split("/")[2];
  if (!Object.values(intentTypes).includes(type)) {
    return false;
  }

  switch (type) {
    case intentTypes.tweet:
      if (!url.searchParams.has("text") && !url.searchParams.has("hashtags")) {
        return false;
      }
      break;
    case intentTypes.follow:
      if (!url.searchParams.has("screen_name") && !url.searchParams.has("user_id")) {
        return false;
      }
      break;
    case intentTypes.retweet:
      if (!url.searchParams.has("tweet_id")) {
        return false;
      }
      break;
    case intentTypes.like:
      if (!url.searchParams.has("tweet_id")) {
        return false;
      }
      break;
    case intentTypes.reply:
      if (!url.searchParams.has("tweet_id")) {
        return false;
      }
      break;
    default:
      break;
  }

  return true;
};

export const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setSearchParams = (newParams: { [x: string]: string }) => {
    const params = new URLSearchParams(searchParams);
    const keys = Object.keys(newParams);
    for (const key of keys) {
      params.set(key, newParams[key]);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return [searchParams, setSearchParams] as const;
};
