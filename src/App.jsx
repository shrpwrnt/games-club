import { useState } from 'react';
import styled from 'styled-components';

// Стилизованные компоненты
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: lawngreen;
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td`
  border: 1px solid red;
  padding: 8px;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Button = styled.button`
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
`;

const SearchInput = styled(Input)`
  margin-bottom: 20px;
`;

// Компонент GameTable
function GameTable() {
  const initialGames = [{ name: 'GTA V', rating: '10', comment: 'топ из топов' }];
  const [games, setGames] = useState(initialGames);
  const [showAddGameInputs, setShowAddGameInputs] = useState(false);
  const [newGame, setNewGame] = useState({ name: '', rating: '', comment: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Добавление новой игры
  const addGame = () => {
    if(newGame.name && newGame.rating && newGame.comment) {
      setGames([...games, newGame]);
      setNewGame({ name: '', rating: '', comment: '' }); // Сброс полей для новой строки
    }
  };

  // Отображение игр, соответствующих поиску
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchInput
        type="text"
        placeholder="Поиск по названию"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Название игры</TableHeaderCell>
            <TableHeaderCell>Оценка</TableHeaderCell>
            <TableHeaderCell>Комментарий</TableHeaderCell>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredGames.map((game, index) => (
            <TableRow key={index}>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.rating}</TableCell>
              <TableCell>{game.comment}</TableCell>
            </TableRow>
          ))}
          {showAddGameInputs && (
            <TableRow>
              <TableCell>
                <Input
                  placeholder="Название игры"
                  value={newGame.name}
                  onChange={(e) =>
                    setNewGame({ ...newGame, name: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Оценка"
                  value={newGame.rating}
                  onChange={(e) =>
                    setNewGame({ ...newGame, rating: e.target.value })
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="Комментарий"
                  value={newGame.comment}
                  onChange={(e) =>
                    setNewGame({ ...newGame, comment: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      <Button onClick={addGame}>Добавить игру</Button>
      <Button onClick={() => setShowAddGameInputs(true)}>
          Показать поля для добавления игры
        </Button>

    </>
  );
}

export default GameTable;