import request from 'supertest';
import { app } from '../../app';
import {
  createShortUrl,
  updateShortUrlByID,
  getAllShortUrls,
  getUrlShortByCustomAlias,
  deleteShortUrlByID
} from '../../controller/url-short.controller';

jest.mock('../../controller/url-short.controller', () => ({
  createShortUrl: jest.fn(),
  updateShortUrlByID: jest.fn(),
  getAllShortUrls: jest.fn(),
  getUrlShortByCustomAlias: jest.fn(),
  deleteShortUrlByID: jest.fn()
}));

describe('Express Routes', () => {
  it('GET / should call getAllShortUrls controller function', async () => {
    await request(app).get('/api/v1/url-shorten');
    expect(getAllShortUrls).toHaveBeenCalled();
  });

  it('GET /:customAlias should call getUrlShortByCustomAlias controller function', async () => {
    await request(app).get('/api/v1/url-shorten/:customAlias');
    expect(getUrlShortByCustomAlias).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { customAlias: 'example' }
      })
    );
  });

  it('PUT /:ID should call updateShortUrlByID controller function', async () => {
    await request(app).put('/123');
    expect(updateShortUrlByID).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { ID: '123' }
      })
    );
  });

  it('POST / should call createShortUrl controller function', async () => {
    await request(app)
      .post('/')
      .send({ originalUrl: 'https://example.com', customAlias: 'example' });
    expect(createShortUrl).toHaveBeenCalledWith(
      expect.objectContaining({
        body: { originalUrl: 'https://example.com', customAlias: 'example' }
      })
    );
  });

  it('DELETE /:ID should call deleteShortUrlByID controller function', async () => {
    await request(app).delete('/123');
    expect(deleteShortUrlByID).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { ID: '123' }
      })
    );
  });
});
