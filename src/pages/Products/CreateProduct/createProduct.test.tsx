import { act, fireEvent, render, screen } from "@test/utils";
import { CreateProduct } from "./createProduct";
import * as User from "@services/api/user";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Create Product test", () => {
  beforeEach(() => {
    vi.spyOn(User, "createProduct").mockReturnThis();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("Shounld render correctly", () => {
    const { container } = render(<CreateProduct />);

    const screenElement = screen.getByText(/Novo produto:/);
    const handleBackElement = screen.getByText(/Voltar/);
    const inputElements = container.querySelectorAll("input[type=text]");

    expect(inputElements).toHaveLength(3);
    expect(screenElement).toBeInTheDocument();
    expect(handleBackElement).toBeInTheDocument();
  });

  it("Should validate Form", async () => {
    render(<CreateProduct />);

    const submitElement = screen.getByText("Salvar");
    expect(submitElement).toBeInTheDocument();

    await act(() => {
      fireEvent.click(submitElement);
    });

    const validationNameMessage = screen.getByText("O nome é obrigatório");
    const validationPriceMessage = screen.getByText("O preço é obrigatório");
    const validationquantityMessage = screen.getByText("Quantidade obrigatória");

    expect(validationNameMessage).toBeInTheDocument();
    expect(validationPriceMessage).toBeInTheDocument();
    expect(validationquantityMessage).toBeInTheDocument();
  });

  it("Should fill but not submit Form", async () => {
    render(<CreateProduct />);

    const submitElement = screen.getByText("Salvar");
    expect(submitElement).toBeInTheDocument();

    act(() => {
      fireEvent.change(screen.getByLabelText("Nome do produto"), {
        target: { name: "name", value: "Nome do produto" },
      });
    });

    act(() => {
      fireEvent.change(screen.getByLabelText("Preço"), {
        target: { name: "price", value: "2500" },
      });
    });

    act(() => {
      fireEvent.change(screen.getByLabelText("Quantidade"), {
        target: { name: "quantity", value: "30" },
      });
    });

    fireEvent.click(submitElement);

    expect(User.createProduct).toHaveBeenCalledTimes(0);
  });
});
