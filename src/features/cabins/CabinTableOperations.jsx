import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortBy from "./../../ui/SortBy";
function CabinTableOperations() {
  return (
    <>
      <TableOperations />
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-dsc", label: "Sort by name(Z-A)" },
          { value: "tototalPrice-asc", label: "Sort by Price(low first)" },
          { value: "tototalPrice-dsc", label: "Sort by name(high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity(low first)" },
          { value: "maxCapacity-dsc", label: "Sort by capacity(high first)" },
        ]}
      />
    </>
  );
}
export default CabinTableOperations;
