--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: box; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE box (
    id bigint NOT NULL,
    closed boolean NOT NULL,
    price bigint NOT NULL,
    car_brand_id bigint
);


ALTER TABLE box OWNER TO postgres;

--
-- Name: box_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE box_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE box_id_seq OWNER TO postgres;

--
-- Name: box_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE box_id_seq OWNED BY box.id;


--
-- Name: car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car (
    id bigint NOT NULL,
    number character varying(255) NOT NULL,
    car_brand_id bigint,
    client_id bigint
);


ALTER TABLE car OWNER TO postgres;

--
-- Name: car_brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_brand (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE car_brand OWNER TO postgres;

--
-- Name: car_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_brand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_brand_id_seq OWNER TO postgres;

--
-- Name: car_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_brand_id_seq OWNED BY car_brand.id;


--
-- Name: car_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE car_id_seq OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_id_seq OWNED BY car.id;


--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE client_id_seq OWNED BY client.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY box ALTER COLUMN id SET DEFAULT nextval('box_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car ALTER COLUMN id SET DEFAULT nextval('car_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_brand ALTER COLUMN id SET DEFAULT nextval('car_brand_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client ALTER COLUMN id SET DEFAULT nextval('client_id_seq'::regclass);


--
-- Data for Name: box; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO box (id, closed, price, car_brand_id) VALUES (1, false, 100, 1);
INSERT INTO box (id, closed, price, car_brand_id) VALUES (2, false, 100, 2);
INSERT INTO box (id, closed, price, car_brand_id) VALUES (3, false, 100, 3);


--
-- Name: box_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('box_id_seq', 3, true);


--
-- Data for Name: car; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO car (id, number, car_brand_id, client_id) VALUES (1, '123', 1, 1);
INSERT INTO car (id, number, car_brand_id, client_id) VALUES (3, '124', 2, 1);


--
-- Data for Name: car_brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO car_brand (id, name) VALUES (1, 'Mazda');
INSERT INTO car_brand (id, name) VALUES (2, 'Mersedes');
INSERT INTO car_brand (id, name) VALUES (3, 'Kia');
INSERT INTO car_brand (id, name) VALUES (4, 'Volga');


--
-- Name: car_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('car_brand_id_seq', 4, true);


--
-- Name: car_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('car_id_seq', 3, true);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO client (id, email, password) VALUES (1, 'test', 'pass');
INSERT INTO client (id, email, password) VALUES (2, 'test2', 'pass');


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('client_id_seq', 2, true);


--
-- Name: box_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY box
    ADD CONSTRAINT box_pkey PRIMARY KEY (id);


--
-- Name: car_brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_brand
    ADD CONSTRAINT car_brand_pkey PRIMARY KEY (id);


--
-- Name: car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car
    ADD CONSTRAINT car_pkey PRIMARY KEY (id);


--
-- Name: client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: uk_6pdllwlx4dltos33q1kk311fb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_brand
    ADD CONSTRAINT uk_6pdllwlx4dltos33q1kk311fb UNIQUE (name);


--
-- Name: uk_bfgjs3fem0hmjhvih80158x29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client
    ADD CONSTRAINT uk_bfgjs3fem0hmjhvih80158x29 UNIQUE (email);


--
-- Name: uk_hni4urt3gng4yws350f7ebc1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car
    ADD CONSTRAINT uk_hni4urt3gng4yws350f7ebc1 UNIQUE (number);


--
-- Name: fk25qij9tft0j67d5u0uhfqdraw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car
    ADD CONSTRAINT fk25qij9tft0j67d5u0uhfqdraw FOREIGN KEY (car_brand_id) REFERENCES car_brand(id);


--
-- Name: fk8au5vrjyk9y4drtgd4hmscy94; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY box
    ADD CONSTRAINT fk8au5vrjyk9y4drtgd4hmscy94 FOREIGN KEY (car_brand_id) REFERENCES car_brand(id);


--
-- Name: fkqudpn3oci54oqa8wgn4wdo7ab; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car
    ADD CONSTRAINT fkqudpn3oci54oqa8wgn4wdo7ab FOREIGN KEY (client_id) REFERENCES client(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

