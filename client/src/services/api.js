export const getPublishers = (params) => {
  const { startRow, endRow } = params;
  const url = `http://localhost:3000/api/publishers?offset=${startRow}&limit=${
    endRow - startRow
  }`;
  setTimeout(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const totalRows = +data.total;
        const rows = data.publishers;
        params.successCallback(rows, totalRows);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        params.failCallback();
      });
  }, 1000);
};

export const getAllPublisherIds = async () => {
  const url = 'http://localhost:3000/api/publisherIds';
  return await fetch(url).then((response) => response.json());
};

export const createBoardgame = async (body) => {
  const url = 'http://localhost:3000/api/boardgames';
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const getBoardgames = async (offset, limit) => {
  const url = `http://localhost:3000/api/boardgames?offset=${offset}&limit=${limit}`;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000);
  return await fetch(url).then((response) => response.json());
};

export const getBoardgameById = async (id) => {
  const url = `http://localhost:3000/api/boardgames/${id}`;
  return await fetch(url).then((response) => response.json());
};

export const updateBoardgame = async (id, body) => {
  const url = `http://localhost:3000/api/boardgames/${id}`;
  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
};

export const deleteBoardgame = async (id) => {
  const url = `http://localhost:3000/api/boardgames/${id}`;
  return await fetch(url, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.status;
  });
};
