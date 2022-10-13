import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack, Form } from "react-bootstrap";
import { useState } from "react";



const Sneaker = ({
	sneaker,
	buy,
	addmoreSneakers,
	onestar,
	twostar,
	threestar,
	isOwner,
}) => {
	const {
		id,
		brand,
		image,
		description,
		price,
		owner,
		availableSneakers,
		sneakersSold,
		onestarRating,
		twostarRating,
		threestarRating
	} = sneaker;


	
	const [ammount, setAmmount] = useState("");

	

	const triggerBuy = () => {
		buy(id, price);
	};

	const triggeraddSneakers = () => {
		addmoreSneakers(id, ammount);
	};

	const triggeronestar = () => {
		onestar(id);
	};

	const triggertwostar = () => {
		twostar(id);
	};

	const triggerthreestar = () => {
		threestar(id);
	};
	
	

	return (
		<Col>
			<Card className=" h-100">
				<Card.Header>
					<Stack direction="horizontal" gap={3}>
						<span className="font-monospace text-secondary">
							{availableSneakers} Sneakers Available
						</span>
						<Badge bg="secondary" className="ms-auto">
							{sneakersSold} Sold
						</Badge>
					</Stack>
				</Card.Header>
				<div className=" ratio ratio-4x3">
					<img
						src={image}
						alt={brand}
						style={{ objectFit: "cover" }}
					/>
				</div>
				<Card.Body className="d-flex  flex-column text-center">
					<Card.Title>{brand}</Card.Title>
					<Card.Text className="flex-grow-1 ">
						{description}
					</Card.Text>

					<Card.Title>Ratings</Card.Title>


					<Badge bg="secondary" className="ms-auto">
							one star {onestarRating}
						</Badge>

						<Badge bg="secondary" className="ms-auto">
							two star {twostarRating}
						</Badge>

						<Badge bg="secondary" className="ms-auto">
							three star {threestarRating}
						</Badge>
					

					

					{isOwner === true && (
						<>
							<Form.Control
								className={"pt-2 mb-1"}
								type="number"
								placeholder="Enter Ammount"
								onChange={(e) => {
									setAmmount(e.target.value);
								}}
							/>

							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggeraddSneakers()}
							>
							Add more Sneakers
							</Button>
						</>
					)}

					{isOwner !== true && (
						<>
							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggeronestar()}
							>
								One star rate
							</Button>
						</>
					)}

{isOwner !== true && (
						<>
							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggertwostar()}
							>
								Two star rate
							</Button>
						</>
					)}

{isOwner !== true  &&(
						<>
							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggerthreestar()}
							>
								Three star rate
							</Button>
						</>
					)}

					

					{isOwner !== true && availableSneakers > 0  && (
						<Button
							variant="outline-dark"
							onClick={triggerBuy}
							className="w-100 py-3 mb-4"
						>
							Buy for {utils.format.formatNearAmount(price)} NEAR
						</Button>
					
					)}


				</Card.Body>
			</Card>
		</Col>
	);
};

Sneaker.propTypes = {
	sneaker: PropTypes.instanceOf(Object).isRequired,
	buy: PropTypes.func.isRequired,
};

export default Sneaker;
