import { sequelize } from '../config/db.js';
import { Publisher } from '../models/publisher.js';
import {
  PUBLISHER_NOT_FOUND,
  PUBLISHER_NOT_UPDATE_BODY,
  PUBLISHERS_QUERY_COUNT,
  PUBLISHERS_QUERY_CREATE,
  PUBLISHER_BODY_NAME_ERROR,
  PUBLISHER_BODY_FOUNDATION_DATE_ERROR,
  PUBLISHER_BODY_TIN_ERROR,
  PUBLISHER_BODY_RATING_ERROR,
  PUBLISHER_PARAM_ID_ERROR,
  PUBLISHERS_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET,
  PUBLISHERS_QUERY_GET_BY_ID,
  PUBLISHERS_QUERY_GET_ALL_ID,
  PUBLISHERS_QUERY_UPDATE,
  PUBLISHERS_QUERY_WHERE,
  PUBLISHERS_QUERY_DELETE,
  BOARDGAMES_QUERY_DELETE_BY_PUBLISHERS_ID,
} from './constants.js';

export async function createPublisher(req, res) {
  try {
    const bodyErrors = [];
    if (!req.body.name) {
      bodyErrors.push(PUBLISHER_BODY_NAME_ERROR);
    }
    if (!req.body.foundation_date) {
      bodyErrors.push(PUBLISHER_BODY_FOUNDATION_DATE_ERROR);
    }
    if (!req.body.tin) {
      bodyErrors.push(PUBLISHER_BODY_TIN_ERROR);
    }
    if (!req.body.rating) {
      bodyErrors.push(PUBLISHER_BODY_RATING_ERROR);
    }

    if (bodyErrors.length > 0) {
      const error = bodyErrors.join(' ');
      throw new Error(error);
    }

    const { name, foundation_date, tin, rating } = req.body;

    const [[publisher]] = await sequelize.query(PUBLISHERS_QUERY_CREATE, {
      replacements: { name, foundation_date, tin, rating },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getPublishers(req, res) {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const [{ total }] = await sequelize.query(PUBLISHERS_QUERY_COUNT, {
      type: sequelize.QueryTypes.SELECT,
    });

    const publishers = await sequelize.query(
      PUBLISHERS_QUERY_GET_ALL_BY_LIMIT_AND_OFFSET,
      {
        replacements: {
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
        },
        type: sequelize.QueryTypes.SELECT,
      },
    );

    res.status(200).json({ total, publishers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllPublisherId(req, res) {
  try {
    const publisherIds = await sequelize.query(PUBLISHERS_QUERY_GET_ALL_ID, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(publisherIds);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updatePublisher(req, res) {
  try {
    const body = req.body;

    const { id } = req.params;
    if (!parseInt(id, 10)) {
      throw new Error(PUBLISHER_PARAM_ID_ERROR);
    }

    const values = [];
    const replacements = { id: parseInt(id, 10) };

    for (const key in body) {
      values.push(`${key} = :${key}`);
      replacements[key] = body[key];
    }

    if (values.length === 0) {
      throw new Error(PUBLISHER_NOT_UPDATE_BODY);
    }

    const query =
      PUBLISHERS_QUERY_UPDATE +
      values.join(', ') +
      ' ' +
      PUBLISHERS_QUERY_WHERE;

    const updated = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updated[1]) {
      const [updatePublisher] = await sequelize.query(
        PUBLISHERS_QUERY_GET_BY_ID,
        {
          replacements: {
            id: parseInt(id, 10),
          },
          type: sequelize.QueryTypes.SELECT,
        },
      );
      res.status(200).json(updatePublisher);
    } else {
      res.status(404).json({ error: PUBLISHER_NOT_FOUND });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deletePublisher(req, res) {
  try {
    const { id } = req.params;

    if (!parseInt(id, 10)) {
      throw new Error(PUBLISHER_PARAM_ID_ERROR);
    }

    const publisher = await sequelize.query(PUBLISHERS_QUERY_GET_BY_ID, {
      replacements: {
        id: parseInt(id, 10),
      },
      type: sequelize.QueryTypes.SELECT,
    });

    if (publisher.length === 0) {
      return res.status(404).json({ error: PUBLISHER_NOT_FOUND });
    }

    await sequelize.query(BOARDGAMES_QUERY_DELETE_BY_PUBLISHERS_ID, {
      replacements: {
        publishers_id: parseInt(publisher[0].id, 10),
      },
      type: sequelize.QueryTypes.DELETE,
    });

    await sequelize.query(PUBLISHERS_QUERY_DELETE, {
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
