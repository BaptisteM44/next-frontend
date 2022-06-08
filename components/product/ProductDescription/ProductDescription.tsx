import cx from "classnames";

import styles from "./ProductDescription.module.css";

export type ProductDescriptionProps = {
  className: string;
  description: string;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  className,
  description,
}) => (
  <div
    className={cx(styles.description, className)}
    dangerouslySetInnerHTML={{ __html: description }}
  />
);

export default ProductDescription;
