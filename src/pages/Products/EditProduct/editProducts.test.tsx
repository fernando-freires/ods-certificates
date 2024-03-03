import * as User from "@services/api/user";
import { act, render } from "@test/utils";
import { EditProduct } from "./editProduct";

const mockedUsedNavigate = vi.fn();
const useParamsMock = vi.hoisted(() => vi.fn().mockReturnValue({ id: "5a03f101-1ac6-4208-979a-baf2191aa6ce" }));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useParams: useParamsMock,
}));

describe("Create Product test", () => {
  beforeEach(() => {
    vi.spyOn(User, "editUserProduct").mockReturnThis();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  const productMock = {
    id: "1",
    name: "produto teste",
    price: "preço teste",
    quantity: "30",
  };

  it("Shounld render correctly", async () => {
    const id = "1";

    vi.spyOn(User, "getProductById").mockReturnValue(productMock);

    const getProductRequest = await User.getProductById(id);

    await act(() => {
      render(<EditProduct />);
    });

    expect(getProductRequest).toEqual(productMock);
    expect(User.getProductById).toHaveBeenCalledTimes(1);
  });
});
