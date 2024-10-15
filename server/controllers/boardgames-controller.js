import { sequelize } from '../config/db.js';
import { Boardgame } from '../models/boardgame.js';
import {
  BOARDGAME_NOT_FOUND,
  BOARDGAME_NOT_UPDATE_BODY,
  BOARDGAME_BODY_TITLE_ERROR,
  BOARDGAME_BODY_RELEASE_DATE_ERROR,
  BOARDGAME_BODY_PRICE_ERROR,
  BOARDGAME_BODY_PUBLISHERS_ID_ERROR,
  BOARDGAMES_QUERY_COUNT,
  BOARDGAMES_QUERY_CREATE,
  BOARDGAMES_QUERY_DELETE,
  BOARDGAMES_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET,
  BOARDGAMES_QUERY_GET_BY_ID,
  BOARDGAMES_QUERY_UPDATE,
  BOARDGAMES_QUERY_WHERE,
  BOARDGAME_PARAM_ID_ERROR,
  PUBLISHER_NOT_FOUND,
  PUBLISHERS_QUERY_GET_BY_ID,
} from './constants.js';

export async function createBoardgame(req, res) {
  try {
    const bodyErrors = [];
    if (!req.body.title) {
      bodyErrors.push(BOARDGAME_BODY_TITLE_ERROR);
    }
    if (!req.body.release_date) {
      bodyErrors.push(BOARDGAME_BODY_RELEASE_DATE_ERROR);
    }
    if (!req.body.price) {
      bodyErrors.push(BOARDGAME_BODY_PRICE_ERROR);
    }
    if (!req.body.publishers_id) {
      bodyErrors.push(BOARDGAME_BODY_PUBLISHERS_ID_ERROR);
    }

    if (bodyErrors.length > 0) {
      const error = bodyErrors.join(' ');
      throw new Error(error);
    }

    const { title, release_date, price, publishers_id } = req.body;

    const publisher = await sequelize.query(PUBLISHERS_QUERY_GET_BY_ID, {
      replacements: {
        id: parseInt(publishers_id, 10),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    if (publisher.length === 0) {
      return res.status(404).json({ error: PUBLISHER_NOT_FOUND });
    }

    const [[boardgame]] = await sequelize.query(BOARDGAMES_QUERY_CREATE, {
      replacements: { title, release_date, price, publishers_id },
      type: sequelize.QueryTypes.INSERT,
    });

    const [{ total }] = await sequelize.query(BOARDGAMES_QUERY_COUNT, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(201).json({ total, boardgame });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getBoardgames(req, res) {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const [{ total }] = await sequelize.query(BOARDGAMES_QUERY_COUNT, {
      type: sequelize.QueryTypes.SELECT,
    });

    const boardgames = await sequelize.query(
      BOARDGAMES_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET,
      {
        replacements: {
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
        },
        type: sequelize.QueryTypes.SELECT,
      },
    );

    res.status(200).json({ total, boardgames });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getBoardgameById(req, res) {
  try {
    const { id } = req.params;
    if (!parseInt(id, 10)) {
      throw new Error(BOARDGAME_PARAM_ID_ERROR);
    }

    const boardgame = await sequelize.query(BOARDGAMES_QUERY_GET_BY_ID, {
      replacements: {
        id: parseInt(id, 10),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const [{ total }] = await sequelize.query(BOARDGAMES_QUERY_COUNT, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ total, boardgame });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateBoardgame(req, res) {
  try {
    const body = req.body;

    const { id } = req.params;
    if (!parseInt(id, 10)) {
      throw new Error(BOARDGAME_PARAM_ID_ERROR);
    }

    const values = [];
    const replacements = { id: parseInt(id, 10) };

    for (const key in body) {
      values.push(`${key} = :${key}`);
      replacements[key] = body[key];
    }

    if (values.length === 0) {
      throw new Error(BOARDGAME_NOT_UPDATE_BODY);
    }

    const query =
      BOARDGAMES_QUERY_UPDATE +
      values.join(', ') +
      ' ' +
      BOARDGAMES_QUERY_WHERE;

    const updated = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updated[1]) {
      const [updateBoardgame] = await sequelize.query(
        BOARDGAMES_QUERY_GET_BY_ID,
        {
          replacements: {
            id: parseInt(id, 10),
          },
          type: sequelize.QueryTypes.SELECT,
        },
      );

      res.status(200).json(updateBoardgame);
    } else {
      res.status(404).json({ error: BOARDGAME_NOT_FOUND });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteBoardgame(req, res) {
  try {
    const { id } = req.params;

    if (!parseInt(id, 10)) {
      throw new Error(BOARDGAME_PARAM_ID_ERROR);
    }

    const boardgame = await sequelize.query(BOARDGAMES_QUERY_GET_BY_ID, {
      replacements: {
        id: parseInt(id, 10),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    if (boardgame.length === 0) {
      return res.status(404).json({ error: BOARDGAME_NOT_FOUND });
    }

    await sequelize.query(BOARDGAMES_QUERY_DELETE, {
      replacements: {
        id: parseInt(id, 10),
      },
      type: sequelize.QueryTypes.DELETE,
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
