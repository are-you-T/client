import HeartBtn from "@/components/board/Button/HeartBtn/HeartBtn";

import {
  Card,
  Header,
  Title,
  Main,
  Content,
  Date,
  Divider,
  Footer,
  FooterCol,
  Category,
} from "./BulletinCard.styles";

interface BulletinCardProps {
  id: string;
  showModal: (id: string) => void;
  title: string;
  content: string;
  category: string;
  color: string;
  like: number;
  createdAt: number;
}
export default function BulletinCard({
  id,
  showModal,
  title,
  content,
  category,
  color,
  like,
  createdAt,
}: BulletinCardProps) {
  //내용 글자수 제한

  const toggleEllipsis = (str: string, limit: number) => {
    const strToArr = Array.from(str);
    if (strToArr.length > limit) {
      return strToArr.slice(0, limit).join("") + "...";
    } else {
      return str;
    }
  };

  //날짜 계산
  const calculateDate = (createdAt: number): string => {
    if (createdAt === 0) {
      return "오늘";
    } else {
      return `${createdAt}일 전`;
    }
  };
  // 이벤트 버블링을 막음
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <Card
      id={id}
      style={{ backgroundColor: color }}
      onClick={() => showModal(id)}
    >
      <div>
        <Header>
          <Title>{toggleEllipsis(title, 7)}</Title>
        </Header>

        <Main>
          <Content>{toggleEllipsis(content, 26)}</Content>
        </Main>
      </div>

      <Footer>
        <div>
          <Date>{calculateDate(createdAt)}</Date>
          <Divider />
        </div>
        <FooterCol onClick={handleClick}>
          <Category>{category}</Category>
          <HeartBtn id={id} like={like} />
        </FooterCol>
      </Footer>
    </Card>
  );
}
