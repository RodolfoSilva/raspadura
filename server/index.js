import restify from 'restify';
import errors from 'restify-errors';
import request from 'request-promise-native';
import cheerio from 'cheerio';
import fs from 'fs';
import * as _ from 'lodash';
import corsMiddleware from 'restify-cors-middleware';
import restifyPlugins from 'restify-plugins';

import tabletojson from 'tabletojson';

const server = restify.createServer();

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

const cors = corsMiddleware({
    origins: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);

const propertiesToForm = (properties) => properties.reduce((last, property) => Object.assign({}, last, { [property.name]: property.value }), {});

const findElement = (selector, html) => {
    const $ = cheerio.load(html);
    const $resultado = $(selector);

    return $resultado.wrap('<div/>').parent().html();
};

const parseTableToJson = (html) => tabletojson.convert(html);
const parseToText = (html) => cheerio.load(html).text();

const findAndParseToJson = (selector, html) => {
    const el = findElement(selector, html);
    return parseTableToJson(el);
};



server.post('/scrape', async (req, res, next) => {
    const options = {
        url: req.params.url,
        method: req.params.httpMethod,
        form: propertiesToForm(req.params.properties),
        resolveWithFullResponse: true
    };

    const { body, statusCode, headers } = await request(options);

    const payload = req.params.extractors.reduce((payload, { name, selector, parser, replace, format }) => {
        let value = findElement(selector, body);

        switch (parser) {
            case 'tableToJson':
                value = parseTableToJson(value);
                break;
            case 'toText':
                value = parseToText(value);
                break;
        }

        if (replace && _.isString(value)) {
            value = value.replace(new RegExp(replace), format);
        }

        return Object.assign({}, payload, { [name]: value });
    }, {});

    if (parseInt(req.params.statusCode) !== statusCode) {
        return next(new errors.InvalidContentError(`O serviço não respondeu com o código esperado, ${statusCode}`));
    }

    res.send({
        response: {
            statusCode,
            headers
        },
        payload
    });
    // res.sendRaw(body);
    next();


    // res.send(options);
    // next();

    // //All the web scraping magic will happen here
    // //   url = 'http://www.imdb.com/title/tt1229340/';
    // const requests = Promise.all([
    //     getFolhaByMonth(1),
    //     getFolhaByMonth(2),
    //     getFolhaByMonth(3),
    //     getFolhaByMonth(4),
    //     getFolhaByMonth(5),
    //     getFolhaByMonth(6),
    //     getFolhaByMonth(7)
    // ]).then((results) => {
    //     let data = {};

    //     results.forEach((result) => {

    //         result[0].forEach((row) => {
    //             if (!row['Matrícula']) return;

    //             let key = row['Matrícula'];

    //             if (!data[key]) {
    //                 data[key] = {
    //                     name: row['Nome'],
    //                     type: row['Tipo Servidor'],
    //                     office: row['Cargo'],
    //                     salary: {
    //                         base: [],
    //                         benefits: [],
    //                         bonus: []
    //                     }
    //                 };
    //             }

    //             data[key].salary.base.push(row['Salário Base']);
    //             data[key].salary.benefits.push(row['Salário Vantagens']);
    //             data[key].salary.bonus.push(row['Salário Gratificação']);
    //         });
    //     });

    //     res.send(_.values(data));
    //     next();
    // });

    // // The URL we will scrape from - in our example Anchorman 2.
});


server.listen(5000, function () {
    console.log('%s listening at %s', server.name, server.url);
});