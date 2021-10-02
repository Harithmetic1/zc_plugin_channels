import React, { useEffect, useState, useMemo } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router";
import { useHistory } from "react-router";

import APIService from "../../../../utils/api";

//redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "../../../../redux/actions/app";

// import MessageCard from "../MessageCard/MessageCard";
import MessageCard from "../../../shared/MessageCard";
import EmptyStateComponent from "../../../createChannel/EmptyStateComponent";

//centrifuge
import Centrifuge from "centrifuge";
import { GET_RENDEREDMESSAGES } from "../../../../redux/actions/types";

const MessageCardContainer = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { _getChannelMessages, _getSocket } = bindActionCreators(
    appActions,
    dispatch
  );
  const { channelMessages, sockets, renderedMessages, users } = useSelector(
    (state) => state.appReducer
  );
  //console.log(channelMessages, sockets);

  const [allChannelMessage, setAllChannelMessage] = useState();
  const [moreMessages, setMoreMessages] = useState(false);

  useEffect(() => {
    console.log("\n\n\nUseEffect works\n\n\n");
    const loadData = async () => {
      _getChannelMessages("614679ee1a5607b13c00bcb7", channelId);
    };
    loadData();
  }, [channelId]);

  return (
    <>
      <EmptyStateComponent />
      {channelMessages && channelMessages.length > 0 && (
        <Box>
          <Flex
            borderRadius="15px"
            p="4px 6px"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            gridGap="4px"
          >
            <Button
              background="#FFFFFF"
              border="1px solid rgba(87, 87, 87, 0.3)"
              borderRadius="15px"
              size="xs"
              mb="10px"
              rightIcon={<FaCaretDown />}
            >
              Today
            </Button>
          </Flex>

          <Box>
            {channelMessages &&
              channelMessages.length > 0 &&
              channelMessages.map((message) => {
                return message === [] ? (
                  <Text textAlign="center">Loading...</Text>
                ) : (
                  <MessageCard
                    {...message}
                    key={message._id}
                    channelId={channelId}
                    message={message}
                  />
                );
              })}
            {/* {
              channelMessages.length > 0 ? 
              <Text color="#1264A3" textAlign="center" cursor="pointer" onClick={loadMore}>{channelMessages.length > messageStartingIndex  ? "Load More..." : " "}</Text> :
              null 
            } */}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MessageCardContainer;
