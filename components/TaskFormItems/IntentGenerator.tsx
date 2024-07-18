import { intentTypes } from "@/constants/twitter";
import { Divider, Input, Select } from "antd";
import AddTag from "./AddTag";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { intentLinkParamsStore, setParamsValue, setType } from "@/redux/slides/intentLinkParams";

const getOptions = () => {
  return Object.keys(intentTypes).map((key, index) => ({
    label: key,
    value: Object.values(intentTypes)[index],
  }));
};

const FollowIntentContent = () => {
  const dispatch = useAppDispatch();
  const {
    params: { screenName, userID },
  } = useAppSelector(intentLinkParamsStore);
  return (
    <div>
      <Input
        placeholder="Enter screen name"
        className="mt-3 text-sm xl:text-base"
        disabled={userID !== ""}
        value={screenName}
        onChange={(event) => {
          dispatch(setParamsValue({ screenName: event.target.value, userID: "" }));
        }}
        allowClear
      />
      <Input
        placeholder="Enter user ID"
        className="my-3 text-sm xl:text-base"
        disabled={screenName !== ""}
        value={userID}
        onChange={(event) => {
          dispatch(setParamsValue({ screenName: "", userID: event.target.value }));
        }}
        allowClear
      />
    </div>
  );
};

const TweetIDIntentContent = () => {
  const dispatch = useAppDispatch();
  const {
    params: { tweetID },
  } = useAppSelector(intentLinkParamsStore);
  return (
    <Input
      value={tweetID}
      onChange={(event) => {
        dispatch(setParamsValue({ tweetID: event.target.value }));
      }}
      placeholder="Enter tweet ID"
      className="my-3 text-sm xl:text-base"
      allowClear
    />
  );
};

const TweetIntentContent = () => {
  const dispatch = useAppDispatch();
  const {
    params: { text },
  } = useAppSelector(intentLinkParamsStore);
  return (
    <div className="my-3">
      <Input.TextArea
        value={text}
        onChange={(event) => {
          dispatch(setParamsValue({ text: event.target.value }));
        }}
        placeholder="What do you want to tweet?"
        rows={2}
        allowClear
        className="text-sm xl:text-base"
      />
      <div className="flex gap-x-2 items-center mt-1">
        <h3 className="text-sm xl:text-base text-black my-2">Hashtags</h3>
        <AddTag />
      </div>
    </div>
  );
};

const getContent = (intentType: string) => {
  switch (intentType) {
    case intentTypes.tweet:
      return <TweetIntentContent />;
    case intentTypes.retweet:
      return <TweetIDIntentContent />;
    case intentTypes.like:
      return <TweetIDIntentContent />;
    case intentTypes.reply:
      return <TweetIDIntentContent />;
    case intentTypes.follow:
      return <FollowIntentContent />;
    default:
      return <></>;
  }
};

function IntentGenerator() {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector(intentLinkParamsStore);

  return (
    <div className="mt-2">
      <Divider orientation="left">
        <span className="text-xs xl:text-sm">Intent Link Generator</span>
      </Divider>
      <div className="flex gap-x-3">
        <h4 className="text-sm xl:text-base text-black my-1">Action type</h4>
        <Select
          value={type}
          onChange={(value) => {
            dispatch(setType(value));
          }}
          options={getOptions()}
          className="flex-1 text-sm xl:text-base"
        />
      </div>
      {getContent(type)}
    </div>
  );
}

export default IntentGenerator;
