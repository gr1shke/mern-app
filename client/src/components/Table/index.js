import _ from 'lodash';

const Table = ({ columns, rows }) => {
  return (
    <table className='striped responsive-table'>
      <thead>
        <tr>
          {columns.map((column) => <th key={_.uniqueId('t_head_')}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          rows.map(
            (row, key) => 
              <tr key={key}>
                <td>{row.id}</td>
                <td>{row.language}</td>
                <td>{row.name}</td>
                <td>{row.sex}</td>
                <td>{row.provider}</td>
              </tr>
          )
        }
      </tbody>
    </table>
  )
};

export default Table;