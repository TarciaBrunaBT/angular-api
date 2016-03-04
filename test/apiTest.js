describe("API Test", function () {
	it("Should be configured", function () {
		
		var config = {
				baseUrl: "http://kapta.gennera.com.br/",
				nocache: true,
				resources: {
					app: {},
					formulario: {
						resources: {
							resposta: {
								resources: {
									lancamento: {}
								},
							},
							relatorio: {},
							comunicado: {}
						},
						beforeSave: function (data) {
							data.metadata = JSON.stringify(data.metadata);
							return data;
						}
					},
					smtp: {
						operations: {
							testar: {
								method: "put"
							},
							homologar: {
								method: "post"
							},
							confirmar: {
								method: "get"
							}
						}
					},
					portador: {},
					pergunta: {}
				}
			};
		
		var http = {
				get: function (url) {
					return "GET(" + url + ")";
				},
				post: function (url, data) {
					return "POST(" + url + ")";
				},
				put: function (url, data) {
					return "PUT(" + url + ")";
				},
				delete: function (url) {
					return "DELETE(" + url + ")";
				}
			};

			var api = buildApi(config, http);

			Date.prototype.getTime = function () {
				return "xyz";
			};
			
			expect(api.app.get(1)).toBe("GET(http://kapta.gennera.com.br/app/1?nocache=xyz)");
			expect(api.app.get(2, {customer: 1})).toBe("GET(http://kapta.gennera.com.br/app/2?customer=1&nocache=xyz)");
			expect(api.formulario.list({fields: "id,hash,titulo,tags,seguranca"})).toBe("GET(http://kapta.gennera.com.br/formulario?fields=id,hash,titulo,tags,seguranca&nocache=xyz)");
			expect(api.smtp.save({})).toBe("POST(http://kapta.gennera.com.br/smtp)");
			expect(api.smtp.getOperations(2).testar({})).toBe("PUT(http://kapta.gennera.com.br/smtp/2/testar?nocache=xyz)");
			expect(api.smtp.getOperations(10).testar(undefined, {customer: 1, user: 2, product: 100})).toBe("PUT(http://kapta.gennera.com.br/smtp/10/testar?customer=1&user=2&product=100&nocache=xyz)");
			expect(api.smtp.getOperations().homologar({})).toBe("POST(http://kapta.gennera.com.br/smtp/homologar?nocache=xyz)");
			expect(api.smtp.getOperations(2).confirmar(undefined, {customer: 1})).toBe("GET(http://kapta.gennera.com.br/smtp/2/confirmar?customer=1&nocache=xyz)");
			expect(api.portador.get(3)).toBe("GET(http://kapta.gennera.com.br/portador/3?nocache=xyz)");
			expect(api.pergunta.update(4, {})).toBe("PUT(http://kapta.gennera.com.br/pergunta/4)");
			expect(api.pergunta.update(5, {}, {customer: 1})).toBe("PUT(http://kapta.gennera.com.br/pergunta/5?customer=1)");
			expect(api.formulario.getResources(5).resposta.delete(9)).toBe("DELETE(http://kapta.gennera.com.br/formulario/5/resposta/9)");
			expect(api.formulario.getResources(6).relatorio.get(10)).toBe("GET(http://kapta.gennera.com.br/formulario/6/relatorio/10?nocache=xyz)");
			expect(api.formulario.getResources(7).comunicado.get(11)).toBe("GET(http://kapta.gennera.com.br/formulario/7/comunicado/11?nocache=xyz)");
			expect(api.formulario.getResources(8).resposta.getResources(12).lancamento.get(13)).toBe("GET(http://kapta.gennera.com.br/formulario/8/resposta/12/lancamento/13?nocache=xyz)");
			expect(api.formulario.getResources(8).resposta.getResources(12).lancamento.get(14, {customer: 1})).toBe("GET(http://kapta.gennera.com.br/formulario/8/resposta/12/lancamento/14?customer=1&nocache=xyz)");
			expect(api.formulario.save({})).toBe("POST(http://kapta.gennera.com.br/formulario)");
			expect(api.formulario.save({}, {customer: 1})).toBe("POST(http://kapta.gennera.com.br/formulario?customer=1)");
	});
});