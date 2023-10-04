import { useState } from "react";
import {
  CommentModalBg,
  CommentContentWrap,
  CommentContenBox,
  CommentContenDetail
} from "@/components/comment/CommentContent.styles";
import { CommentEdit } from "@/components/comment/CommentEdit";
import { ReactComponent as Profile } from "@/assets/img/profile.svg";
import { ReactComponent as Setting } from "@/assets/img/comment_setting.svg";

export function CommentContent() {
  const [showModal, setShowModal] = useState<string>("");

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = () => {
    setShowModal("CommentEditModal");
  };

  return (
    <>
      <CommentContentWrap>
        <CommentContenBox>
          <div>
            <Profile />
          </div>
          <div>
            <div>요즘 악뮤 노래 너무 좋은 것 같아</div>
            <CommentContenDetail>
              <button>댓글달기</button>
              <div>2023. 09. 29. 13:43</div>
            </CommentContenDetail>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              fill="#FC5013"
            >
              <path
                stroke="#FC5013"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
                d="M4.5 1C2.567 1 1 2.491 1 4.33c0 1.486.613 5.01 6.642 8.573a.71.71 0 0 0 .716 0C14.388 9.34 15 5.816 15 4.331 15 2.49 13.433 1 11.5 1S8 3.019 8 3.019 6.433 1 4.5 1Z"
              />
            </svg>
          </div>

          <div className="dropdown dropdown-end">
            <Setting tabIndex={0} className="m-1"></Setting>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow rounded-box w-[120px] bg-white text-black"
            >
              <li>
                <button onClick={handleEditClick}>수정</button>
              </li>
              <li>
                <p>삭제</p>
              </li>
            </ul>
          </div>
        </CommentContenBox>
        {showModal !== "" && (
          <>
            <CommentModalBg onClick={() => setShowModal("")} />
            {showModal === "CommentEditModal" && (
              <CommentEdit onClose={() => setShowModal("")} />
            )}
          </>
        )}
      </CommentContentWrap>
    </>
  );
}
