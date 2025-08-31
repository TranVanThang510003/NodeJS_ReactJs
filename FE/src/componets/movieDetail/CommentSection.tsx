import { useEffect, useState } from 'react';
import { Input, Button, message, List, Avatar } from 'antd';
import { getCommentsByMovie, addCommentApi } from '../../util/api.js';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;
interface User {
    username?: string;
    name?: string;
}

interface Comment {
    _id?: string;
    content: string;
    userId?: User;
}
const CommentSection = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async () => {
    try {
      const res = await getCommentsByMovie(movieId as string);
      console.log(res)
      if (res?.data?.success) {
        setComments(res.data.data);
      } else {
        message.error(res.data.message  || 'Không thể lấy bình luận');
      }
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi lấy bình luận');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const handleAddComment = async () => {
    if (!content.trim()) {
      return message.warning('Vui lòng nhập nội dung bình luận');
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return message.warning('Bạn cần đăng nhập để bình luận');
    }

    setLoading(true);
    try {
        if (!movieId) {
            message.error("Không tìm thấy movieId");
            return;
        }
        const res = await addCommentApi({ movieId , content });
      if (res?.data?.success) {
        message.success('Bình luận thành công');
        setContent('');
        fetchComments();
      } else {
        message.error(res?.data?.message || 'Không thể gửi bình luận')
      }
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi gửi bình luận');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 bg-[#1f1f1f] rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-2">Bình luận</h3>

      <TextArea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập bình luận của bạn..."
        className="mb-2"
      />

      <div className="flex justify-end mt-2 mb-4">
        <Button
          type="primary"
          onClick={handleAddComment}
          loading={loading}
        >
          Gửi bình luận
        </Button>
      </div>


      <List
        itemLayout="horizontal"
        dataSource={comments}
        locale={{ emptyText: 'Chưa có bình luận nào' }}
        renderItem={(item) => (
          <List.Item className="!bg-[#2a2a2a] !rounded-md !mb-2 !px-4 !py-3">
            <div className="flex items-start gap-4 w-full">
              <Avatar
                style={{
                  backgroundColor: '#4FD1C5',
                  verticalAlign: 'middle',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
                size="large"
              >
                {(item.userId?.username || item.userId?.name || '?')
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>

              <div className="flex flex-col">
          <span className="text-white font-semibold">
            {item.userId?.username || item.userId?.name || 'Người dùng'}
          </span>
                <span className="text-gray-300">{item.content}</span>
              </div>
            </div>
          </List.Item>
        )}
      />

    </div>
  );
};

export default CommentSection;
