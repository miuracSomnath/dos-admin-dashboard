import { AddIcon, CloseCircle } from '@admin/assets';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddSubCategory from '../../../Midl/meta-products/hooks/sub-category/add-subcategory';
import useGetSubCategories from '../../../Midl/meta-products/hooks/sub-category/get-subcategories';
import useUpdateSubCategory from '../../../Midl/meta-products/hooks/sub-category/update-subcategory';
import {
  TMetaProductFamily,
  TMetaProductSubCategory,
} from '../../../Midl/meta-products/types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../../store';
import clsx from 'clsx';
import { orderBy } from 'firebase/firestore';
import _ from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BehaviorSubject } from 'rxjs';
import * as yup from 'yup';
import ApplicationButton, { ButtonWithoutStyles } from '../../global/buttons';
import InfoText from '../../global/info-text';
import ApplicationModal from '../../global/modal';
import ApplicationSpinner from '../../global/spinner';
import ApplicationTextInput from '../../global/text-input';

import styles from './styles/meta.module.scss';
import { setMetaProductCategoriesByFamily } from '../../../Midl/meta-products/store/meta-product.category.slice';
import { TApplicationErrorObject, useSubject } from 'rxf-rewrite/dist';
import { ApplicationSelectInput } from '../../global/select-input';
import SimpleModal from '../../global/simpleModal/modal';
import { MenuItem, Typography } from '@mui/material';
import DOSInput from '../../../UI/dosinput/dosinput';

const selectedProductFamily$ = new BehaviorSubject<TMetaProductFamily | null>(
  null
);

const showAddForm$ = new BehaviorSubject(false);

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(12),
});

const ProductSubCategory: React.FC = () => {
  useSubject(showAddForm$);
  useSubject(selectedProductFamily$);
  const { getSubCategories, loadingFlag } = useGetSubCategories(true);
  const productFamilies = useSelector(
    (state: RootState) => state.metaProductFamily.metaProductFamilies
  );
  const [localSubCategory, setLocalSubCategory] = React.useState<
    Array<TMetaProductSubCategory>
  >([]);
  const { metaProductSubCategories, addError } = useSelector(
    (state: RootState) => state.metaProductSubCategory
  );
  const {
    addNewSubCategory,
    completed,
    loadingFlag: addLoadingFlag,
    completedSetter,
  } = useAddSubCategory(showAddForm$.value);

  React.useEffect(() => {
    metaProductSubCategories.length === 0 &&
      getSubCategories([orderBy('index')]);
    productFamilies.length > 0 &&
      selectedProductFamily$.next(productFamilies[0]);
  }, []);

  React.useEffect(() => {
    const filtered = metaProductSubCategories.filter(
      (s) => s.familyId === selectedProductFamily$.value?.id
    );
    setLocalSubCategory(_.orderBy(filtered, 'index'));
  }, [selectedProductFamily$.value, metaProductSubCategories]);

  return (
    <div className={styles['root-content']}>
      <div className={styles['heading']}>
        <div></div>
        <h2>Product Sub-Category</h2>
        <ApplicationButton
          variant="default"
          clickAction={() => {
            showAddForm$.next(true);
            completedSetter(false);
          }}
          disabled={selectedProductFamily$.value === null}
        >
          <AddIcon /> <span>Add SubCategory</span>
        </ApplicationButton>
      </div>
      <div className={styles['selector-container']}>
        <div className={styles['product-family-selector']}>
          {productFamilies.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                selectedProductFamily$.next(f);
              }}
              className={
                selectedProductFamily$.value?.name === f.name
                  ? clsx([
                    styles['text-container'],
                    styles['text-after-selector'],
                  ])
                  : styles['text-container']
              }
            >
              <h4
                style={{
                  fontWeight:
                    selectedProductFamily$.value?.name === f.name
                      ? 'bold'
                      : 'normal',
                }}
              >
                {f.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['table-head-subcategory']}></div>
      <div className={styles['list']}>
        {localSubCategory.map((s) => (
          <List key={s.id} subcategory={s} />
        ))}
      </div>
      <SimpleModal open={showAddForm$.value} onClose={() => showAddForm$.next(false)}>
        <Form
          dbError={addError}
          onCompleteText={'Product Sub-Category Has been Successfully Created!'}
          unmountFunc={() => showAddForm$.next(false)}
          submitFormFunc={(name: string, categoryId: string) => {
            selectedProductFamily$.value !== null &&
              addNewSubCategory(
                {
                  name: name,
                  createdBy: 'Somnath',
                  familyId: selectedProductFamily$.value?.id,
                  categoryId: categoryId,
                },
                uuidv4()
              );
          }}
          loadingFlag={addLoadingFlag}
          completed={completed}
        />
      </SimpleModal>
    </div>
  );
};

const List: React.FC<{ subcategory: TMetaProductSubCategory }> = ({
  subcategory,
}) => {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const dbError = useSelector(
    (state: RootState) => state.metaProductCategory.editError
  );
  const {
    updateSubCategoryName,
    loadingFlag,
    completed,
    completedSetter,
    unPublishSubCategory,
    publishSubCategory,
  } = useUpdateSubCategory(showEditForm);

  return (
    <div className={styles['list-content']}>
      <div className={styles['main']}>
        <h3>{subcategory.name}</h3>
        <div className={styles['button-container']}>
          <ApplicationButton
            clickAction={() => {
              setShowEditForm(true);
              completedSetter(false);
            }}
            variant="edit"
          >
            Edit
          </ApplicationButton>
          {subcategory.status === 'published' && (
            <ApplicationButton
              clickAction={() => {
                unPublishSubCategory(subcategory.id);
              }}
              variant="disable"
              disabled={loadingFlag}
            >
              Unpublish
            </ApplicationButton>
          )}
          {subcategory.status === 'unpublished' && (
            <ApplicationButton
              clickAction={() => {
                publishSubCategory(subcategory.id);
              }}
              variant="enable"
              disabled={loadingFlag}
            >
              Publish
            </ApplicationButton>
          )}
        </div>
      </div>
      <div className={styles['footer']}></div>
      <SimpleModal open={showEditForm} onClose={() => setShowEditForm(false)}>
        <Form
          dbError={dbError}
          onCompleteText={'Changes Have Been Saved Successfully!'}
          unmountFunc={() => setShowEditForm(false)}
          submitFormFunc={(name: string) =>
            updateSubCategoryName(
              {
                name: name,
                updatedBy: 'Somnath',
                familyId: subcategory.familyId,
                categoryId: subcategory.categoryId,
              },
              subcategory.id
            )
          }
          completed={completed}
          productSubCategoryNameDefaultValue={subcategory.name}
          loadingFlag={loadingFlag}
        />
      </SimpleModal>
    </div>
  );
};

const Form: React.FC<{
  unmountFunc: () => void;
  submitFormFunc: (name: string, categoryId: string) => void;
  loadingFlag: boolean;
  completed: boolean;
  dbError: TApplicationErrorObject | null;
  onCompleteText: string;
  productSubCategoryNameDefaultValue?: string;
}> = ({
  unmountFunc,
  submitFormFunc,
  loadingFlag,
  completed,
  dbError,
  productSubCategoryNameDefaultValue,
  onCompleteText,
}) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<{ name: string; categoryId: string }>({
      resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();
    const categories = useSelector(
      (state: RootState) => state.metaProductCategory
    );

    React.useEffect(() => {
      const filtered = categories.metaProductCategories.filter(
        (a) => a.familyId === selectedProductFamily$.value?.id
      );
      dispatch(setMetaProductCategoriesByFamily(_.orderBy(filtered, 'index')));
    }, [selectedProductFamily$.value, categories.metaProductCategories]);

    function submit(data: { name: string; categoryId: string }) {
      submitFormFunc(data.name, data.categoryId);
    }

    return (
      <div style={{ width: "30rem", margin: "auto" }}>
        <Typography variant='h5' gutterBottom textAlign="center">Product Sub-Category</Typography>
        <form onSubmit={handleSubmit(submit)}>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
            <label>Sub Category Name:</label>
            <div>
              <DOSInput
                defaultValue={productSubCategoryNameDefaultValue}
                forminput={{ ...register('name') }}
                fullWidth
              />
              <InfoText
                text={
                  errors.name?.message !== undefined ? errors.name.message : ''
                }
                fontFamily="Montserrat"
                variant="error"
              />
              <InfoText
                text={dbError !== null ? dbError.message : ''}
                fontFamily="Montserrat"
                variant="error"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
            <label>Category: </label>
            <DOSInput forminput={{ ...register('categoryId') }} select fullWidth>
              {categories.metaProductCategoriesByFamily.map((c) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </DOSInput>
          </div>
          <div
            className={
              loadingFlag
                ? clsx(
                  styles['form-button-container'],
                  styles['form-button-container-loading']
                )
                : styles['form-button-container']
            }
          >
            {
              loadingFlag ? (
                <ApplicationSpinner />
              ) : (
                <div style={{ display: "flex", justifyContent: "space-evenly", margin: "40px auto", width: "400px" }}>
                  <div style={{ height: 40, width: 100 }}>
                    <ApplicationButton
                      variant="cancel"
                      clickAction={() => unmountFunc()}
                      dimension={{ height: '100%', width: '100%' }}
                    >
                      Cancel
                    </ApplicationButton>
                  </div>
                  <div style={{ height: 40, width: 100 }}>
                    <ApplicationButton
                      variant="default-not-padding"
                      clickAction={handleSubmit(submit)}
                      dimension={{ height: '100%', width: '100%' }}
                    >
                      Save
                    </ApplicationButton>
                  </div>
                </div>
              )}
          </div >
        </form >
        {completed && (
          <InfoText
            text={onCompleteText}
            fontFamily="Montserrat"
            variant="success"
          />
        )}
      </div >
    );
  };

export default ProductSubCategory;
