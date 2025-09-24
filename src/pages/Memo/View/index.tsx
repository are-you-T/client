import { getMemoById, memoQueryKey } from "@/actions/memo.actions";
import { CommentCard } from "@/components/Memo/CommentCard";
import { CommentNote } from "@/components/Memo/CommentNote";
import { Note } from "@/components/Memo/Note";
import useCommentController from "@/controllers/useCommentController";
import useMemoController from "@/controllers/useMemoController";
import { useModal } from "@/hooks/useModal";
import useRouter from "@/hooks/useRouter";
import { setDayjsFormatString } from "@/utils/formatDate";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  Loader,
} from "@mantine/core";
import { IconArrowLeft, IconDotsVertical, IconHeart, IconMessage2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MemoType } from "@/types";

const MemoViewPage = () => {
  const { likeMemo, isLiking } = useMemoController();
  const { goBack, params } = useRouter();
  const { id } = params as { id: string };
  useEffect(() => {
    if (!id) {
      console.error("ID is missing.");
      return;
    }
  }, [id]);

  // const setError = useHandleError(); // 에러 핸들링 함수
  const { openModal } = useModal();

  const { data: memo, isLoading } = useQuery<MemoType | null>({
    queryKey: [memoQueryKey, id],
    queryFn: () => getMemoById(id),
    enabled: !!id,
  });

  const { commentListData } = useCommentController(memo?.id);

  // const { mutate: deleteMutate } = useCustomMutation(["get-memos"], {
  //   method: "delete",
  // });

  // const handleClickLike = (id: string) => {
  //   likeMutate(
  //     {
  //       url: `/memos/${id}/like`, // 동적 URL
  //     },
  //     {
  //       onSuccess: (data: MemoLikeResponse) => {
  //         notifications.show({
  //           title: (
  //             <Flex direction="column">
  //               <Text lineClamp={1} fw={600}>
  //                 {memo?.title}
  //               </Text>
  //               <Text>글을 좋아합니다.</Text>
  //             </Flex>
  //           ),
  //           message: <Text>공감이 {data.likeCount}개가 되었어요! 🥰</Text>,
  //           color: "blue",
  //         });
  //         memoRefetch();
  //         commentsRefetch();
  //       },
  //       onError: (error: Error) => {
  //         notifications.show({
  //           title: "공감 실패",
  //           message: "공감 클릭 중 오류가 발생했어요. 😥",
  //           color: "red",
  //         });
  //         setError(error);
  //       },
  //     }
  //   );
  // };

  // const handleCheckPassword = (password: string): Promise<boolean> => {
  //   return new Promise((resolve, reject) => {
  //     checkMutate(
  //       {
  //         url: `/memos/${id}`,
  //         data: {
  //           password,
  //         },
  //       },
  //       {
  //         onSuccess: () => {
  //           notifications.show({
  //             title: "비밀번호 확인 완료",
  //             message: "비밀번호 확인 완료되었습니다. 😎",
  //             color: "blue",
  //           });
  //           resolve(true); // 성공 시 true 반환
  //         },
  //         onError: (error: Error) => {
  //           notifications.show({
  //             title: "비밀번호 확인 실패",
  //             message: "비밀번호가 일치하지 않아요. 😥",
  //             color: "red",
  //           });
  //           setError(error);
  //           reject(false); // 실패 시 false 반환
  //         },
  //       }
  //     );
  //   });
  // };

  // const handleDelete = (id: string) => {
  //   return new Promise((resolve, reject) => {
  //     deleteMutate(
  //       {
  //         url: `/memos/${id}`,
  //       },
  //       {
  //         onSuccess: () => {
  //           notifications.show({
  //             title: "메모 삭제 완료",
  //             message: "메모가 삭제되었습니다. 😀",
  //             color: "blue",
  //           });
  //           resolve(true); // 성공 시 true 반환
  //         },
  //         onError: (error: Error) => {
  //           notifications.show({
  //             title: "메모 삭제 실패",
  //             message: "메모가 삭제되지 않았어요. 😥",
  //             color: "red",
  //           });
  //           setError(error);
  //           reject(false); // 실패 시 false 반환
  //         },
  //       }
  //     );
  //   });
  // };

  // 로딩 중에는 페이지 본문을 렌더하지 않음
  if (isLoading) {
    return (
      <Flex align="center" justify="center" w="100%" h="60vh">
        <Loader />
      </Flex>
    );
  }

  // 메모가 존재하지 않으면 페이지를 표시하지 않음 (간단한 안내와 뒤로가기만 제공)
  if (!memo) {
    return (
      <Flex direction="column" w="100%" p="md" gap="md">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.1rem">해당 메모를 찾을 수 없어요.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" bg={memo?.cardColor ?? "#FFFFFF"} p="md" gap="lg">
      <Flex justify="space-between" align="center">
        <ActionIcon variant="subtle" color="dark" onClick={() => goBack()}>
          <IconArrowLeft />
        </ActionIcon>
        <Text fz="1.5rem">{memo?.mbtiType}</Text>
        <Menu shadow="md" withArrow withinPortal>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                openModal(<Note id={id} />, null, "메모 수정", true).then((result) => {
                  if (result) {
                  }
                });
                // openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                //   const result = await handleCheckPassword(password as string);

                //   if (result) {
                //     openModal(<Note id={id} />, null, "메모 수정", true).then((result) => {
                //       if (result) {
                //         memoRefetch();
                //         commentsRefetch();
                //       }
                //     });
                //   }
                // }); // 비밀번호 검증
              }}
            >
              <Text fz="1.5rem">수정</Text>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                // openModal(<PasswordForm />, null, "비밀번호 입력").then(async (password) => {
                //   const result = await handleCheckPassword(password as string);
                //   if (result) {
                //     openModal(
                //       <Confirm
                //         message={<Text>정말로 삭제하시겠어요? 😢</Text>}
                //         yesCallback={async () => {
                //           const result = await handleDelete(id);
                //           if (result) {
                //             navigateTo("/memo");
                //             // TODO: goBack으로도 충분한지 확인 필요
                //           }
                //         }}
                //         commonCallback={() => closeModal(null)}
                //       />,
                //       null,
                //       "메모 삭제",
                //       true
                //     );
                //   }
                // }); // 비밀번호 검증
              }}
            >
              <Text fz="1.5rem">삭제</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Card shadow="lg" padding="lg" radius="md" bg="#FFFFFF" w="100%" h="30rem">
        <Flex direction="column" h="100%" gap="sm" justify="space-between">
          <Flex direction="column" gap="md">
            <Group justify="space-between">
              <Text fw={600}>{memo?.title}</Text>
            </Group>
            <Text size="md" h="100%">
              {memo?.content}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <ButtonGroup>
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconHeart />}
                color="dark"
                loading={isLiking(memo.id)}
                disabled={isLiking(memo.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  likeMemo(memo.id);
                }}
              >
                {memo?.likeCount}
              </Button>
            </ButtonGroup>
            <Text ta="end">{setDayjsFormatString(memo?.created_at)}</Text>
          </Flex>
        </Flex>
      </Card>
      <Flex direction="column" w="100%" gap="xs">
        <Flex w="100%" justify="space-between" gap="xs" align="center">
          <Flex gap="xs">
            <Text fz="lg">댓글</Text>
            <IconMessage2 />
            <Text fz="lg">[{memo?.cmtCount}]</Text>
          </Flex>
          <Button
            onClick={() => {
              openModal(<CommentNote memoId={memo.id} />, null, "댓글 작성", true);
            }}
          >
            작성
          </Button>
        </Flex>
        {!memo?.cmtCount ? (
          <Text>댓글이 존재하지 않습니다.</Text>
        ) : (
          <Flex direction="column">
            {commentListData.commentList.map((comment) => {
              return <CommentCard key={comment.id} comment={comment} />;
            })}
          </Flex>
        )}

        {/* {commentTreeData &&
          commentTreeData.map((comment) => {
            if (!comment.parentCommentId) {
              return (
                <Fragment key={comment._id}>
                  <Flex direction="column" gap="xs" w="100%" key={comment._id}>
                    <CommentCard
                      comment={comment}
                      bgColor={bgColor?.[4] ?? "#FFFFF"}
                      onSubmit={() => {
                        memoRefetch();
                        commentsRefetch();
                      }}
                    />
                  </Flex>
                  {comment.children &&
                    comment.children.map((childComment) => {
                      return (
                        <Flex gap="xs" w="100%" key={childComment._id}>
                          <IconCornerDownRight size="1.5rem" />
                          <Flex direction="column" gap="xs" w="100%">
                            <CommentCard
                              comment={childComment}
                              bgColor={bgColor?.[4] ?? "#FFFFF"}
                              onSubmit={() => {
                                memoRefetch();
                                commentsRefetch();
                              }}
                            />
                          </Flex>
                        </Flex>
                      );
                    })}
                </Fragment>
              );
            }
            return (
              <Flex direction="column" gap="xs" w="100%" key={comment._id}>
                <CommentCard
                  comment={comment}
                  bgColor={bgColor?.[4] ?? "#FFFFF"}
                  onSubmit={() => {
                    memoRefetch();
                    commentsRefetch();
                  }}
                />
              </Flex>
            );
          })} */}
      </Flex>
    </Flex>
  );
};

export default MemoViewPage;

// import { useState, useEffect, ReactNode } from "react";
// import { useParams } from "react-router-dom";

// import { ReactComponent as AlertIcon } from "@/assets/img/alert_icon.svg";
// import { ReactComponent as Comment } from "@/assets/img/comment.svg";

// import axiosRequest from "@/api/index";
// import { ResData, Board, BoardPassword } from "@/@types/index";

// import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";
// import { ReactComponent as BackIcon } from "@/assets/img/left_line.svg";
// import OptionBtn from "@/components/board/Button/OptionBtn/OptionBtn";
// import PwCheckModal from "@/components/common/PwCheckModal/PwCheckModal";
// import BoardPost from "@/components/board/BoardPost/BoardPost";

// import {
//   Container,
//   Header,
//   Category,
//   Main,
//   Title,
//   Content,
//   Divider,
//   FooterWrap,
//   Footer,
//   CreateDate,
//   BackBtn
// } from "./CardDetail.styles";
// import { ModalBg } from "@/components/common/MbtiTypesModal/MbtiTypesModal.styles";
// import {
//   CommentContentWrap,
//   CommentModalWrap,
//   ModalWrapCenter
// } from "@/components/board/BoardPost/BoardPost.styles";
// import { CommentContent } from "@/components/comment/CommentContent";
// import { CommentPostContent } from "@/components/comment/CommentPost";
// import CommentBtn from "@/components/board/Button/CommentBtn/CommentBtn";

// // 모달 배경 닫기
// function ModalClose({
//   children,
//   onClose
// }: {
//   children: ReactNode;
//   onClose: () => void;
// }) {
//   const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   return <ModalBg onClick={handleModalBgClick}>{children}</ModalBg>;
// }
// //댓글 모달 임시
// function CommentModal({
//   onClose,
//   selectedId
// }: {
//   onClose: () => void;
//   selectedId: string;
// }) {
//   // console.log("dkdlel", selectedId);
//   return (
//     <ModalClose onClose={onClose}>
//       <CommentModalWrap>
//         {/* 모달 내용 */}
//         {/* 댓글내용 컴포넌트 */}
//         <CommentContentWrap>
//           <CommentContent boardId={selectedId} />
//         </CommentContentWrap>

//         {/* 댓글등록 컴포넌트 */}
//         <CommentPostContent boardId={selectedId} />
//       </CommentModalWrap>
//     </ModalClose>
//   );
// }

// export default function CardDetail() {
//   //파라미터 :selectedId 가져오기
//   const { selectedId } = useParams() as { selectedId: string };

//   //게시글 상태
//   const [posting, setPosting] = useState<Board>({} as Board);

//   //선택한 게시글 불러오기
//   async function getSelectedPosting() {
//     try {
//       const response: ResData<Board> = await axiosRequest.requestAxios<
//         ResData<Board>
//       >("get", `/board/post/${selectedId}`);
//       // console.log("게시글get", response.data);
//       setPosting(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   //날짜 양식 맞추기
//   const twoStringFormat = (date: number): string => {
//     return date < 10 ? "0" + date.toString() : date.toString();
//   };
//   const changeDateFormat = (date: Date): string => {
//     if (date) {
//       const localDate = new Date(date);
//       // console.log("연도", localDate.getFullYear());
//       // console.log("월", localDate.getMonth() + 1);
//       // console.log("일", localDate.getDate());
//       const year = localDate.getFullYear().toString();
//       const month = twoStringFormat(localDate.getMonth() + 1);
//       const day = twoStringFormat(localDate.getDate());

//       return `${year}.${month}.${day}`;
//     }
//     return "";
//   };

//   //뒤로가기
//   const handleBackBtnClick = () => {
//     window.history.back();
//   };

//   //모달 관리
//   const [showModal, setShowModal] = useState<string>("");

//   //모달 선택
//   const selectModal = (modal: string) => {
//     setShowModal(modal);
//   };

//   //게시글 수정 모달
//   const [openBoardEdit, setOpenBoardEdit] = useState<boolean>(false);

//   //게시글 수정 모달 닫히면 새로 불러오기
//   useEffect(() => {
//     getSelectedPosting();
//   }, [openBoardEdit]);

//   const handleClose = () => {
//     setOpenBoardEdit(false); //게시글 수정 모달 닫기
//     setShowModal(""); //비밀번호 확인모달 닫기
//   };

//   //수정 또는 삭제 모드 관리
//   const [activeMode, setActiveMode] = useState(false); //비밀번호가 일치했을 때 true
//   const [mode, setMode] = useState<string>(""); //수정 또는 삭제
//   const selectMode = (mode: string) => {
//     // console.log("mode", mode);
//     setMode(mode);
//   };
//   //비밀번호 일치여부 확인 -> 수정 또는 삭제모드 활성화
//   const checkCorrectPw = (active: boolean) => {
//     // console.log("active", active);
//     setActiveMode(active);
//   };

//   //수정 또는 삭제 기능
//   useEffect(() => {
//     if (activeMode && mode === "edit") setOpenBoardEdit(true);
//     else if (activeMode && mode === "delete") {
//       deletePosting();
//       window.history.back();
//     }
//   }, [activeMode]);

//   //게시글 delete요청
//   async function deletePosting() {
//     try {
//       const response: ResData<BoardPassword> = await axiosRequest.requestAxios<
//         ResData<BoardPassword>
//       >("delete", `/board/${selectedId}`);
//       // console.log("게시글삭제", response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   //댓글 모달
//   const handleCommentClick = () => {
//     setShowModal("CommentModal");
//   };
//   return (
//     <>
//       {openBoardEdit ? (
//         <BoardPost
//           onThisClose={handleClose}
//           onThisComplete={handleClose}
//           thisMbti={posting.category}
//           existingPost={posting}
//         />
//       ) : (
//         <Container bgColor={posting.color}>
//           {showModal === "pwCheckModal" && (
//             <PwCheckModal
//               selectModal={selectModal}
//               selectedId={selectedId}
//               checkCorrectPw={checkCorrectPw}
//             />
//           )}

//           <Header>
//             <BackBtn onClick={handleBackBtnClick}>
//               <BackIcon />
//             </BackBtn>
//             <Category>{posting.category}</Category>
//             <OptionBtn selectModal={selectModal} selectMode={selectMode} />
//           </Header>
//           <Main>
//             <Title>{posting.title}</Title>
//             <Content>{posting.content}</Content>
//           </Main>
//           <FooterWrap>
//             <Divider />
//             <Footer>
//               <HeartBtn id={selectedId} like={posting.like} />
//               {/* 댓글버튼 */}
//               <CommentBtn onClick={handleCommentClick} id={selectedId} />
//               <CreateDate>{changeDateFormat(posting.createdAt)}</CreateDate>
//             </Footer>
//             {showModal !== "" && (
//               <>
//                 {/* 댓글 모달 임시 */}
//                 {showModal === "CommentModal" && (
//                   <CommentModal
//                     onClose={() => setShowModal("")}
//                     selectedId={selectedId}
//                   />
//                 )}
//               </>
//             )}
//           </FooterWrap>
//         </Container>
//       )}
//     </>
//   );
// }
