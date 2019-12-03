/**
 * api接口的统一出口
 */
import photo from '@/common/api/photo';
import caseInfo from '@/common/api/case';
import common from '@/common/api/common';
// 其他模块的接口……

// 导出接口
export
default {
    photo,
    caseInfo,
    common
}