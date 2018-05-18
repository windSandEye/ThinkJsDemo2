/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : liyuan

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-04-20 16:18:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cargo
-- ----------------------------
DROP TABLE IF EXISTS `cargo`;
CREATE TABLE `cargo` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品唯一标识',
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `brand` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品品牌',
  `category_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '类别名称',
  `category_code` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '类别代码',
  `bar_code` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '条形码',
  `selling_price` double(10,2) NOT NULL COMMENT '商品出售价格',
  `purchasing_price` double(10,2) NOT NULL COMMENT '商品进货价格',
  `unit` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品单位',
  `specification` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品参数',
  `description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品描述',
  `cargo_img` mediumblob NOT NULL COMMENT '商品图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cargo
-- ----------------------------

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '数据字典唯一标识',
  `category_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '类型代码',
  `category_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '类型名称',
  `dic_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '字典代码',
  `dic_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '字典名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工唯一标识',
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '员工名称',
  `department_code` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '员工部门代码',
  `department_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '员工部门名称',
  `gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL COMMENT '性别',
  `mobile` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机',
  `address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '住址',
  `duty` varchar(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '职务',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of employee
-- ----------------------------

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '库存唯一标识',
  `cargo_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品关联id',
  `cargo_specification` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品规格',
  `cargo_num` int(10) NOT NULL COMMENT '商品存量',
  `warehouse_id` int(10) NOT NULL COMMENT '仓库关联id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of inventory
-- ----------------------------

-- ----------------------------
-- Table structure for purchase
-- ----------------------------
DROP TABLE IF EXISTS `purchase`;
CREATE TABLE `purchase` (
  `id` int(10) NOT NULL COMMENT '进货唯一id',
  `cargo_id` int(10) NOT NULL,
  `cargo_specification` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '商品规格',
  `number` int(10) NOT NULL COMMENT '进货数量',
  `create_time` datetime NOT NULL COMMENT '进货时间',
  `status` varchar(1) COLLATE utf8_unicode_ci NOT NULL COMMENT '进出货状态：1为进货，2为出货',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchase
-- ----------------------------

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '仓库唯一标识',
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '仓库名称',
  `manager` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '管理者名称',
  `mobile` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '管理者电话',
  `address` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '仓库地址',
  `remark` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of warehouse
-- ----------------------------
