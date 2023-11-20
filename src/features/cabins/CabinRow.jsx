import styled from "styled-components";
import { HiMiniSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { isSubmitting, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    totoalPrice,
    discount,
    description,
  } = cabin;
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      totoalPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{formatCurrency(totoalPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isSubmitting} onClick={handleDuplicate}>
            <HiMiniSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <button
            onClick={() => deleteCabinMutate(cabinId)}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
    </>
  );
}
