const { request: unauthorizedRequest, routes } = require('../lib');
const debug = require('debug')('rs:test:boards');
const {
  createAuthorizedRequest,
  shouldAuthorizationBeTested
} = require('../utils');

const TEST_BOARD_DATA = {
  title: 'Autotest board',
  columns: [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
  ]
};
describe('Boards suite', () => {
  let request = unauthorizedRequest;

  beforeAll(async () => {
    if (shouldAuthorizationBeTested) {
      request = await createAuthorizedRequest(unauthorizedRequest);
    }

    await request
      .post(routes.boards.create)
      .set('Accept', 'application/json')
      .send(TEST_BOARD_DATA);
  });

  describe('GET', () => {
    it('should get all boards', async () => {
      await request
        .get(routes.boards.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          debug(res.body);
          expect(res.body).to.be.an('array');
          jestExpect(res.body).not.toHaveLength(0);
        });
    });

    it('should get a board by id', async () => {
      // Setup
      let expectedBoard;

      await request
        .get(routes.boards.getAll)
        .expect(200)
        .then(res => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          expectedBoard = res.body[0];
        });

      // Test
      await request
        .get(routes.boards.getById(expectedBoard.id))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          jestExpect(res.body).toEqual(expectedBoard);
        });
    });
  });

  describe('POST', () => {
    it('should create board successfully', async () => {
      await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).to.be.a('string');
          jestExpect(res.body).toMatchObject(TEST_BOARD_DATA);
        });
    });
  });

  describe('PUT', () => {
    it('should update board successfully', async () => {
      // Setup
      let boardId;

      await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .then(res => {
          boardId = res.body.id;
        });

      const updatedBoard = {
        ...TEST_BOARD_DATA,
        title: 'Autotest updated board',
        id: boardId
      };

      // Test
      await request
        .put(routes.boards.update(boardId))
        .set('Accept', 'application/json')
        .send(updatedBoard)
        .expect(200)
        .expect('Content-Type', /json/);

      await request
        .get(routes.boards.getById(boardId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => jestExpect(res.body).toMatchObject(updatedBoard));

      // Teardown
      await request.delete(routes.boards.delete(boardId));
    });
  });

  describe('DELETE', () => {
    it('should delete board successfully', async () => {
      let boardId;
      // Setup
      await request
        .get(routes.boards.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          jestExpect(res.body).not.toHaveLength(0);
          boardId = res.body[0].id;
        });

      // Test
      await request
        .delete(routes.boards.delete(boardId))
        .then(res => expect(res.status).oneOf([200, 204]));

      await request.get(routes.boards.getById(boardId)).expect(404);
    });

    it("should delete board's tasks upon deletion", async () => {
      // Setup:
      const res = await request
        .post(routes.boards.create)
        .set('Accept', 'application/json')
        .send(TEST_BOARD_DATA)
        .expect(200);
      const boardId = res.body.id;

      const boardTaskResponses = await Promise.all(
        Array.from(Array(5)).map((_, idx) =>
          request
            .post(routes.tasks.create(boardId))
            .send({
              title: `Task #${idx + 1}`,
              order: idx + 1,
              description: 'Lorem ipsum',
              boardId,
              userId: null,
              columnId: null
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
        )
      );

      const boardTaskIds = boardTaskResponses.map(response => response.body.id);
      await Promise.all(
        boardTaskIds.map(async taskId =>
          request
            .get(routes.tasks.getById(boardId, taskId))
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => expect(response.body.boardId).to.equal(boardId))
        )
      );
      // Test:
      await request
        .delete(routes.boards.delete(boardId))
        .then(response => expect(response.status).oneOf([200, 204]));

      await Promise.all(
        boardTaskIds.map(async taskId =>
          request.get(routes.tasks.getById(boardId, taskId)).expect(404)
        )
      );
    });
  });
});
