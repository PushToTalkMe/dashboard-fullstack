export const PUBLISHER_NOT_FOUND = 'Издатель не найден';
export const PUBLISHER_NOT_UPDATE_BODY = 'Нет обновляемых значений';
export const PUBLISHER_BODY_NAME_ERROR = 'Необходимо указать свойство name.';
export const PUBLISHER_BODY_FOUNDATION_DATE_ERROR =
  'Необходимо указать свойство foundation_date.';
export const PUBLISHER_BODY_TIN_ERROR = 'Необходимо указать свойство tin.';
export const PUBLISHER_BODY_RATING_ERROR =
  'Необходимо указать свойство rating.';
export const PUBLISHER_PARAM_ID_ERROR = 'Необходимо указать параметр id.';
export const PUBLISHERS_QUERY_CREATE =
  'INSERT INTO publishers (name, foundation_date, tin, rating) VALUES (:name, :foundation_date, :tin, :rating) RETURNING *';
export const PUBLISHERS_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET =
  'SELECT * FROM publishers ORDER BY id LIMIT :limit OFFSET :offset';
export const PUBLISHERS_QUERY_COUNT =
  'SELECT COUNT(*) AS total FROM publishers';
export const PUBLISHERS_QUERY_GET_BY_ID =
  'SELECT * FROM publishers WHERE publishers.id = :id';
export const PUBLISHERS_QUERY_GET_ALL_ID = 'SELECT id FROM publishers';
export const PUBLISHERS_QUERY_UPDATE = 'UPDATE publishers SET ';
export const PUBLISHERS_QUERY_WHERE = 'WHERE id = :id';
export const PUBLISHERS_QUERY_DELETE =
  'DELETE FROM publishers' + ' ' + PUBLISHERS_QUERY_WHERE;
export const BOARDGAME_BODY_TITLE_ERROR = 'Необходимо указать свойство title.';
export const BOARDGAME_BODY_RELEASE_DATE_ERROR =
  'Необходимо указать свойство release_date.';
export const BOARDGAME_BODY_PRICE_ERROR = 'Необходимо указать свойство price.';
export const BOARDGAME_BODY_PUBLISHERS_ID_ERROR =
  'Необходимо указать свойство publishers_id.';
export const BOARDGAME_PARAM_ID_ERROR = 'Необходимо указать параметр id.';
export const BOARDGAME_NOT_FOUND = 'Настольная игра не найдена';
export const BOARDGAME_NOT_UPDATE_BODY = 'Нет обновляемых значений';
export const BOARDGAMES_QUERY_CREATE =
  'INSERT INTO boardgames (title, release_date, price, publishers_id) VALUES (:title, :release_date, :price, :publishers_id) RETURNING *';
export const BOARDGAMES_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET =
  'SELECT * FROM boardgames ORDER BY id LIMIT :limit OFFSET :offset';
export const BOARDGAMES_QUERY_COUNT =
  'SELECT COUNT(*) AS total FROM boardgames';
export const BOARDGAMES_QUERY_GET_BY_ID =
  'SELECT * FROM boardgames WHERE boardgames.id = :id';
export const BOARDGAMES_QUERY_UPDATE = 'UPDATE boardgames SET ';
export const BOARDGAMES_QUERY_WHERE = 'WHERE id = :id';
export const BOARDGAMES_QUERY_DELETE_BY_PUBLISHERS_ID =
  'DELETE FROM boardgames WHERE publishers_id = :publishers_id';
export const BOARDGAMES_QUERY_DELETE =
  'DELETE FROM boardgames' + ' ' + BOARDGAMES_QUERY_WHERE;
