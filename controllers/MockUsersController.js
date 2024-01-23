class MockUsersController {
  async index(req, res, next) {
    const users = [
      {
        id: 1,
        nome: "João Silva",
        email: "joaosilva@example.com",
        dataCadastro: "2024-01-20",
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        email: "mariaoliveira@example.com",
        dataCadastro: "2024-01-18",
      },
      {
        id: 3,
        nome: "Carlos Pereira",
        email: "carlospereira@example.com",
        dataCadastro: "2024-01-15",
      },
    ];

    return res.status(200).json(users);
  }
}

export { MockUsersController };
