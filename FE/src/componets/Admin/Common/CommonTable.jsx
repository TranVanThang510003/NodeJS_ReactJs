import { Table } from 'antd';
import { createStyles } from 'antd-style';
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});


const CommonTable = ({columns,  dataSource,loading, error, rowKey, pagination}) => {
  const { styles } = useStyle();
  if (error) {
    console.log(error);
    return <div className="text-red-500">Lỗi: {error.message}</div>;
  }
  return (
    <div className="w-[1000px] ">
      <Table
        rowKey={rowKey}
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        scroll={{x: 'max-content', y: 55 * 8 }}
        pagination={pagination}
      />
    </div>

  );
  };
      export default CommonTable;