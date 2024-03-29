import React, { useEffect, useRef, useState } from 'react';
import { formatMoney } from '../formatMoney';

export default function ProductItem({ product, clickdel, clickedit }) {
	const [dropdownshow, setDropdownshow] = useState(false);
	const clickDropDownShow = () => setDropdownshow(!dropdownshow);
	const more = useRef();

	const handleClickOut = (e) => {
		if (more.current.contains(e.target)) {
			return;
		}
		// outside click
		setDropdownshow(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOut);
		return () => {
			document.removeEventListener('mousedown', handleClickOut);
		};
	}, []);

	const clickdelitem = (product) => {
		setDropdownshow(!dropdownshow);
		clickdel(product);
	};

	const clickedititem = (product) => {
		setDropdownshow(!dropdownshow);
		clickedit(product);
	};

	const clickviewitem = () => {
		setDropdownshow(!dropdownshow);
		window.open(
			`http://localhost:3000/${product.name}?option=${product._id}`,
			'_blank',
		);
	};

	return (
		<div className='product__item'>
			<div className='tag__name__check'>
				<input type='checkbox' />
			</div>
			{/* "https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg" */}
			<div className='tag__name__name'>
				<img
					//src='https://lh3.googleusercontent.com/-uJiYXta7Z3y_J6MQO_lUFM6aFoII57litOf43wUBikenb0HH7SgAyxN5XKg50biNgRocRWa1m6OG8_la8Aai7VHQz0DjRE=w500-rw'
					src={product.images}
					alt='hinhanh'
				/>
				<span>
					<strong>
						{product.name}
						{/* Asus Vivobook 14 A415 */}
					</strong>
				</span>
			</div>
			<div className='tag__name__sku'>
				<span>
					{/* Vivobooka41504CF */}
					{product.sku}
				</span>
			</div>
			<div className='tag__name__price'>
				<span>
					<strong>
						{formatMoney(product.price)}₫{/* 18.290.000 ₫ */}
					</strong>
				</span>
			</div>
			<div className='tag__name__stock'>
				<span>
					{product.discount}₫{/* 10 */}
				</span>
			</div>
			<div className='tag__name__branch'>
				<span>
					{product.brand.name}
					{/* TUF/ROG Gaming */}
				</span>
			</div>
			<div className='tag__name__more' ref={more}>
				<div className='btn__down' onClick={clickDropDownShow}>
					<span className='material-icons'>more_horiz</span>
				</div>
				<div
					id='myDropdown'
					className={
						dropdownshow ? 'dropdown-content showdropdown' : 'dropdown-content'
					}
				>
					<div className='dropdown__item' onClick={clickedititem}>
						<div>
							<i className='far fa-edit' />
							<span>Edit Product</span>
						</div>
					</div>
					<div className='dropdown__item' onClick={clickviewitem}>
						<div>
							<i className='far fa-eye' />
							<span>View Product</span>
						</div>
					</div>
					<div className='dropdown__item' onClick={clickdelitem}>
						<div>
							<i className='far fa-trash-alt' />
							<span>Delete Product</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
