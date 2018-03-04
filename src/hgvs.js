var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var elements = require("./elements");

var HGVS = function HGVS(source, opts) {
    AbstractGrammar.call(this, source, opts);
};

HGVS.grammarName = "HGVS";

HGVS.match = AbstractGrammar.match;

HGVS.matchAll = AbstractGrammar.matchAll;

exports.HGVS = HGVS;

require("util").inherits(HGVS, AbstractGrammar);

HGVS.prototype["hgvs_variant"] = function $hgvs_variant() {
    return this._atomic(function() {
        return this._rule("g_variant", false, [], null, this["g_variant"]);
    }) || this._atomic(function() {
        return this._rule("m_variant", false, [], null, this["m_variant"]);
    }) || this._atomic(function() {
        return this._rule("c_variant", false, [], null, this["c_variant"]);
    }) || this._atomic(function() {
        return this._rule("n_variant", false, [], null, this["n_variant"]);
    }) || this._atomic(function() {
        return this._rule("r_variant", false, [], null, this["r_variant"]);
    }) || this._atomic(function() {
        return this._rule("p_variant", false, [], null, this["p_variant"]);
    });
};

HGVS.prototype["c_variant"] = function $c_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("c") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("c_posedit", false, [], null, this["c_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["g_variant"] = function $g_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("g") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("g_posedit", false, [], null, this["g_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["m_variant"] = function $m_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("m") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("m_posedit", false, [], null, this["m_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["n_variant"] = function $n_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("n") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("n_posedit", false, [], null, this["n_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["p_variant"] = function $p_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("p") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("p_posedit", false, [], null, this["p_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["r_variant"] = function $r_variant() {
    var ac, type, posedit;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("r") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("r_posedit", false, [], null, this["r_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: ac,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["hgvs_position"] = function $hgvs_position() {
    return this._atomic(function() {
        return this._rule("g_hgvs_position", false, [], null, this["g_hgvs_position"]);
    }) || this._atomic(function() {
        return this._rule("m_hgvs_position", false, [], null, this["m_hgvs_position"]);
    }) || this._atomic(function() {
        return this._rule("c_hgvs_position", false, [], null, this["c_hgvs_position"]);
    }) || this._atomic(function() {
        return this._rule("n_hgvs_position", false, [], null, this["n_hgvs_position"]);
    }) || this._atomic(function() {
        return this._rule("r_hgvs_position", false, [], null, this["r_hgvs_position"]);
    }) || this._atomic(function() {
        return this._rule("p_hgvs_position", false, [], null, this["p_hgvs_position"]);
    });
};

HGVS.prototype["c_hgvs_position"] = function $c_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("c") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("c_interval", false, [], null, this["c_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["g_hgvs_position"] = function $g_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("g") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("g_interval", false, [], null, this["g_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["m_hgvs_position"] = function $m_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("m") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("m_interval", false, [], null, this["m_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["n_hgvs_position"] = function $n_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("n") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("n_interval", false, [], null, this["n_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["p_hgvs_position"] = function $p_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("p") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("p_interval", false, [], null, this["p_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["r_hgvs_position"] = function $r_hgvs_position() {
    var ac, type, pos;
    return this._rule("accn", false, [], null, this["accn"]) && (ac = this._getIntermediate(), true) && this._match(":") && this._match("r") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("r_interval", false, [], null, this["r_interval"]) && (pos = this._getIntermediate(), true) && this._exec(elements.HGVSPosition({
        ac: ac,
        type: type,
        pos: post
    }));
};

HGVS.prototype["c_typed_posedit"] = function $c_typed_posedit() {
    var type, posedit;
    return this._match("c") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("c_posedit", false, [], null, this["c_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["g_typed_posedit"] = function $g_typed_posedit() {
    var type, posedit;
    return this._match("g") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("g_posedit", false, [], null, this["g_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["m_typed_posedit"] = function $m_typed_posedit() {
    var type, posedit;
    return this._match("m") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("m_posedit", false, [], null, this["m_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["n_typed_posedit"] = function $n_typed_posedit() {
    var type, posedit;
    return this._match("n") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("n_posedit", false, [], null, this["n_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["p_typed_posedit"] = function $p_typed_posedit() {
    var type, posedit;
    return this._match("p") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("p_posedit", false, [], null, this["p_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["r_typed_posedit"] = function $r_typed_posedit() {
    var type, posedit;
    return this._match("r") && (type = this._getIntermediate(), true) && this._match(".") && this._rule("r_posedit", false, [], null, this["r_posedit"]) && (posedit = this._getIntermediate(), true) && this._exec(elements.SequenceVariant({
        ac: null,
        type: type,
        posedit: posedit
    }));
};

HGVS.prototype["c_posedit"] = function $c_posedit() {
    var pos, edit;
    return this._rule("c_interval", false, [], null, this["c_interval"]) && (pos = this._getIntermediate(), true) && this._rule("dna_edit", false, [], null, this["dna_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
        pos: pos,
        edit: edit
    }));
};

HGVS.prototype["g_posedit"] = function $g_posedit() {
    var pos, edit;
    return this._rule("g_interval", false, [], null, this["g_interval"]) && (pos = this._getIntermediate(), true) && this._rule("dna_edit", false, [], null, this["dna_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
        pos: pos,
        edit: edit
    }));
};

HGVS.prototype["m_posedit"] = function $m_posedit() {
    var pos, edit;
    return this._rule("m_interval", false, [], null, this["m_interval"]) && (pos = this._getIntermediate(), true) && this._rule("dna_edit", false, [], null, this["dna_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
        pos: pos,
        edit: edit
    }));
};

HGVS.prototype["n_posedit"] = function $n_posedit() {
    var pos, edit;
    return this._rule("n_interval", false, [], null, this["n_interval"]) && (pos = this._getIntermediate(), true) && this._rule("dna_edit", false, [], null, this["dna_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
        pos: pos,
        edit: edit
    }));
};

HGVS.prototype["r_posedit"] = function $r_posedit() {
    var pos, edit, pos, edit;
    return this._atomic(function() {
        return this._rule("r_interval", false, [], null, this["r_interval"]) && (pos = this._getIntermediate(), true) && this._rule("rna_edit", false, [], null, this["rna_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
            pos: pos,
            edit: edit
        }));
    }) || this._atomic(function() {
        return this._match("(") && this._rule("r_interval", false, [], null, this["r_interval"]) && (pos = this._getIntermediate(), true) && this._rule("rna_edit", false, [], null, this["rna_edit"]) && (edit = this._getIntermediate(), true) && this._match(")") && this._exec(elements.PosEdit({
            pos: pos,
            edit: edit
        }));
    });
};

HGVS.prototype["p_posedit"] = function $p_posedit() {
    var pos, edit, pos, edit;
    return this._atomic(function() {
        return this._rule("p_interval", false, [], null, this["p_interval"]) && (pos = this._getIntermediate(), true) && this._rule("pro_edit", false, [], null, this["pro_edit"]) && (edit = this._getIntermediate(), true) && this._exec(elements.PosEdit({
            pos: pos,
            edit: edit
        }));
    }) || this._atomic(function() {
        return this._match("(") && this._rule("p_interval", false, [], null, this["p_interval"]) && (pos = this._getIntermediate(), true) && this._rule("pro_edit", false, [], null, this["pro_edit"]) && (edit = this._getIntermediate(), true) && this._match(")") && this._exec(elements.PosEdit({
            pos: pos,
            edit: edit
        }));
    }) || this._atomic(function() {
        return this._rule("p_posedit_special", false, [], null, this["p_posedit_special"]);
    });
};

HGVS.prototype["p_posedit_special"] = function $p_posedit_special() {
    return this._atomic(function() {
        var x;
        return this._match("=") && (x = this._getIntermediate(), true) && this._exec(elements.PosEdit({
            pos: null,
            edit: x,
            uncertain: false
        }));
    }) || this._atomic(function() {
        var x;
        return this._match("(") && this._match("=") && (x = this._getIntermediate(), true) && this._match(")") && this._exec(elements.PosEdit({
            pos: null,
            edit: x,
            uncertain: true
        }));
    }) || this._atomic(function() {
        var x;
        return this._match("0") && (x = this._getIntermediate(), true) && this._match("?") && this._exec(elements.PosEdit({
            pos: null,
            edit: x,
            uncertain: true
        }));
    }) || this._atomic(function() {
        var x;
        return this._match("0") && (x = this._getIntermediate(), true) && this._exec(elements.PosEdit({
            pos: null,
            edit: x,
            uncertain: false
        }));
    }) || this._atomic(function() {
        var x;
        return this._match("?") && (x = this._getIntermediate(), true) && this._exec(null);
    });
};

HGVS.prototype["dna_edit_mu"] = function $dna_edit_mu() {
    return this._atomic(function() {
        return this._rule("dna_edit", false, [], null, this["dna_edit"]);
    }) || this._atomic(function() {
        var edit;
        return this._match("(") && this._rule("dna_edit", false, [], null, this["dna_edit"]) && (edit = this._getIntermediate(), true) && this._match(")") && this._exec(edit.setUncertain());
    });
};

HGVS.prototype["dna_edit"] = function $dna_edit() {
    return this._atomic(function() {
        return this._rule("dna_ident", false, [], null, this["dna_ident"]);
    }) || this._atomic(function() {
        return this._rule("dna_subst", false, [], null, this["dna_subst"]);
    }) || this._atomic(function() {
        return this._rule("dna_delins", false, [], null, this["dna_delins"]);
    }) || this._atomic(function() {
        return this._rule("dna_ins", false, [], null, this["dna_ins"]);
    }) || this._atomic(function() {
        return this._rule("dna_del", false, [], null, this["dna_del"]);
    }) || this._atomic(function() {
        return this._rule("dna_dup", false, [], null, this["dna_dup"]);
    }) || this._atomic(function() {
        return this._rule("dna_inv", false, [], null, this["dna_inv"]);
    }) || this._atomic(function() {
        return this._rule("dna_con", false, [], null, this["dna_con"]);
    }) || this._atomic(function() {
        return this._rule("dna_copy", false, [], null, this["dna_copy"]);
    });
};

HGVS.prototype["dna_ident"] = function $dna_ident() {
    var ref;
    return this._list(function() {
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("dna", false, [], null, this["dna"]);
            });
        });
    }, true) && (ref = this._getIntermediate(), true) && this._match("=") && this._exec(elements.NARefAlt({
        ref: ref,
        alt: ref
    }));
};

HGVS.prototype["dna_subst"] = function $dna_subst() {
    var ref, alt;
    return this._rule("dna", false, [], null, this["dna"]) && (ref = this._getIntermediate(), true) && this._match(">") && this._rule("dna", false, [], null, this["dna"]) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: alt
    }));
};

HGVS.prototype["dna_delins"] = function $dna_delins() {
    var ref, alt;
    return this._match("del") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("dna", false, [], null, this["dna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._match("ins") && this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("dna", false, [], null, this["dna"]);
            });
        });
    }, true) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: ref
    }));
};

HGVS.prototype["dna_del"] = function $dna_del() {
    var ref;
    return this._match("del") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("dna", false, [], null, this["dna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: null
    }));
};

HGVS.prototype["dna_ins"] = function $dna_ins() {
    var alt;
    return this._match("ins") && this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("dna", false, [], null, this["dna"]);
            });
        });
    }, true) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: null,
        alt: ref
    }));
};

HGVS.prototype["dna_dup"] = function $dna_dup() {
    var ref;
    return this._match("dup") && this._list(function() {
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("dna", false, [], null, this["dna"]);
            });
        });
    }, true) && (ref = this._getIntermediate(), true) && this._exec(elements.Dup({
        ref: ref
    }));
};

HGVS.prototype["dna_inv"] = function $dna_inv() {
    var ref;
    return this._match("inv") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("dna", false, [], null, this["dna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._exec(elements.Inv({
        ref: null
    }));
};

HGVS.prototype["dna_con"] = function $dna_con() {
    var pos;
    return this._match("con") && this._rule("hgvs_position", false, [], null, this["hgvs_position"]) && (pos = this._getIntermediate(), true) && this._exec(elements.Conv({
        from_ac: pos.ac,
        from_type: pos.type,
        from_pos: pos.pos
    }));
};

HGVS.prototype["dna_copy"] = function $dna_copy() {
    var n;
    return this._match("copy") && this._rule("num", false, [], null, this["num"]) && (n = this._getIntermediate(), true) && this._exec(elements.NACopy({
        copy: n
    }));
};

HGVS.prototype["rna_edit_mu"] = function $rna_edit_mu() {
    return this._atomic(function() {
        return this._rule("rna_edit", false, [], null, this["rna_edit"]);
    }) || this._atomic(function() {
        var edit;
        return this._match("(") && this._rule("rna_edit", false, [], null, this["rna_edit"]) && (edit = this._getIntermediate(), true) && this._match(")") && this._exec(edit.setUncertain());
    });
};

HGVS.prototype["rna_edit"] = function $rna_edit() {
    return this._atomic(function() {
        return this._rule("rna_ident", false, [], null, this["rna_ident"]);
    }) || this._atomic(function() {
        return this._rule("rna_subst", false, [], null, this["rna_subst"]);
    }) || this._atomic(function() {
        return this._rule("rna_delins", false, [], null, this["rna_delins"]);
    }) || this._atomic(function() {
        return this._rule("rna_ins", false, [], null, this["rna_ins"]);
    }) || this._atomic(function() {
        return this._rule("rna_del", false, [], null, this["rna_del"]);
    }) || this._atomic(function() {
        return this._rule("rna_dup", false, [], null, this["rna_dup"]);
    }) || this._atomic(function() {
        return this._rule("rna_inv", false, [], null, this["rna_inv"]);
    }) || this._atomic(function() {
        return this._rule("rna_con", false, [], null, this["rna_con"]);
    });
};

HGVS.prototype["rna_ident"] = function $rna_ident() {
    var ref;
    return this._list(function() {
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("rna", false, [], null, this["rna"]);
            });
        });
    }, true) && (ref = this._getIntermediate(), true) && this._match("=") && this._exec(elements.NARefAlt({
        ref: ref,
        alt: ref
    }));
};

HGVS.prototype["rna_subst"] = function $rna_subst() {
    var ref, alt;
    return this._rule("rna", false, [], null, this["rna"]) && (ref = this._getIntermediate(), true) && this._match(">") && this._rule("rna", false, [], null, this["rna"]) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: alt
    }));
};

HGVS.prototype["rna_delins"] = function $rna_delins() {
    var ref, alt;
    return this._match("del") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("rna", false, [], null, this["rna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._match("ins") && this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("rna", false, [], null, this["rna"]);
            });
        });
    }, true) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: alt
    }));
};

HGVS.prototype["rna_del"] = function $rna_del() {
    var ref;
    return this._match("del") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("rna", false, [], null, this["rna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: ref,
        alt: null
    }));
};

HGVS.prototype["rna_ins"] = function $rna_ins() {
    var alt;
    return this._match("ins") && this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("rna", false, [], null, this["rna"]);
            });
        });
    }, true) && (alt = this._getIntermediate(), true) && this._exec(elements.NARefAlt({
        ref: null,
        alt: alt
    }));
};

HGVS.prototype["rna_dup"] = function $rna_dup() {
    var ref;
    return this._match("dup") && this._list(function() {
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("rna", false, [], null, this["rna"]);
            });
        });
    }, true) && (ref = this._getIntermediate(), true) && this._exec(elements.Dup({
        ref: ref
    }));
};

HGVS.prototype["rna_inv"] = function $rna_inv() {
    var ref;
    return this._match("inv") && (this._atomic(function() {
        return this._list(function() {
            return this._rule("num", false, [], null, this["num"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._any(function() {
                return this._atomic(function() {
                    return this._rule("rna", false, [], null, this["rna"]);
                });
            });
        }, true);
    })) && (ref = this._getIntermediate(), true) && this._exec(elements.Inv({
        ref: null
    }));
};

HGVS.prototype["rna_con"] = function $rna_con() {
    var pos;
    return this._match("con") && this._rule("hgvs_position", false, [], null, this["hgvs_position"]) && (pos = this._getIntermediate(), true) && this._exec(elements.Conv({
        from_ac: pos.ac,
        from_type: pos.type,
        from_pos: pos.pos
    }));
};

HGVS.prototype["pro_edit_mu"] = function $pro_edit_mu() {
    return this._atomic(function() {
        return this._rule("pro_edit", false, [], null, this["pro_edit"]);
    }) || this._atomic(function() {
        var edit;
        return this._match("(") && this._rule("pro_edit", false, [], null, this["pro_edit"]) && (edit = this._getIntermediate(), true) && this._match(")") && this._exec(edit.setUncertain());
    });
};

HGVS.prototype["pro_edit"] = function $pro_edit() {
    return this._atomic(function() {
        return this._rule("pro_fs", false, [], null, this["pro_fs"]);
    }) || this._atomic(function() {
        return this._rule("pro_ext", false, [], null, this["pro_ext"]);
    }) || this._atomic(function() {
        return this._rule("pro_subst", false, [], null, this["pro_subst"]);
    }) || this._atomic(function() {
        return this._rule("pro_delins", false, [], null, this["pro_delins"]);
    }) || this._atomic(function() {
        return this._rule("pro_ins", false, [], null, this["pro_ins"]);
    }) || this._atomic(function() {
        return this._rule("pro_del", false, [], null, this["pro_del"]);
    }) || this._atomic(function() {
        return this._rule("pro_dup", false, [], null, this["pro_dup"]);
    }) || this._atomic(function() {
        return this._rule("pro_ident", false, [], null, this["pro_ident"]);
    });
};

HGVS.prototype["pro_subst"] = function $pro_subst() {
    var alt;
    return (this._atomic(function() {
        return this._rule("aat13", false, [], null, this["aat13"]);
    }) || this._match("?")) && (alt = this._getIntermediate(), true) && this._exec(elements.AASub({
        ref: "",
        alt: alt
    }));
};

HGVS.prototype["pro_delins"] = function $pro_delins() {
    var alt;
    return this._match("delins") && this._rule("aat13_seq", false, [], null, this["aat13_seq"]) && (alt = this._getIntermediate(), true) && this._exec(elements.AASub({
        ref: "",
        alt: alt
    }));
};

HGVS.prototype["pro_del"] = function $pro_del() {
    return this._match("del") && this._exec(elements.AASub({
        ref: "",
        alt: alt
    }));
};

HGVS.prototype["pro_ins"] = function $pro_ins() {
    var alt;
    return this._match("ins") && this._rule("aat13_seq", false, [], null, this["aat13_seq"]) && (alt = this._getIntermediate(), true) && this._exec(elements.AASub({
        ref: null,
        alt: alt
    }));
};

HGVS.prototype["pro_dup"] = function $pro_dup() {
    return this._match("dup") && this._exec(elements.Dup({
        ref: ""
    }));
};

HGVS.prototype["pro_fs"] = function $pro_fs() {
    var alt, length;
    return (this._atomic(function() {
        return this._rule("aat13", false, [], null, this["aat13"]);
    }) || this._atomic(function() {
        return this._exec("");
    })) && (alt = this._getIntermediate(), true) && this._rule("fs", false, [], null, this["fs"]) && (length = this._getIntermediate(), true) && this._exec(elements.AAFs({
        ref: "",
        alt: alt,
        length: length
    }));
};

HGVS.prototype["pro_ext"] = function $pro_ext() {
    var alt, ext;
    return this._optional(function() {
        return this._rule("aat13", false, [], null, this["aat13"]);
    }) && (alt = this._getIntermediate(), true) && this._rule("ext", false, [], null, this["ext"]) && (ext = this._getIntermediate(), true) && this._exec(elements.AAExt({
        ref: "",
        alt: alt,
        aaterm: ext.aaterm,
        length: ext.length
    }));
};

HGVS.prototype["pro_ident"] = function $pro_ident() {
    return this._match("=") && this._exec(elements.AARefAlt({
        ref: "",
        alt: ""
    }));
};

HGVS.prototype["c_interval"] = function $c_interval() {
    return this._atomic(function() {
        return this._rule("def_c_interval", false, [], null, this["def_c_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_c_interval", false, [], null, this["def_c_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["g_interval"] = function $g_interval() {
    return this._atomic(function() {
        return this._rule("def_g_interval", false, [], null, this["def_g_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_g_interval", false, [], null, this["def_g_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["m_interval"] = function $m_interval() {
    return this._atomic(function() {
        return this._rule("def_m_interval", false, [], null, this["def_m_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_m_interval", false, [], null, this["def_m_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["n_interval"] = function $n_interval() {
    return this._atomic(function() {
        return this._rule("def_n_interval", false, [], null, this["def_n_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_n_interval", false, [], null, this["def_n_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["p_interval"] = function $p_interval() {
    return this._atomic(function() {
        return this._rule("def_p_interval", false, [], null, this["def_p_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_p_interval", false, [], null, this["def_p_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["r_interval"] = function $r_interval() {
    return this._atomic(function() {
        return this._rule("def_r_interval", false, [], null, this["def_r_interval"]);
    }) || this._atomic(function() {
        var iv;
        return this._match("(") && this._rule("def_r_interval", false, [], null, this["def_r_interval"]) && (iv = this._getIntermediate(), true) && this._match(")") && this._exec(iv.setUncertain());
    });
};

HGVS.prototype["def_g_interval"] = function $def_g_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("g_pos", false, [], null, this["g_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("g_pos", false, [], null, this["g_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("g_pos", false, [], null, this["g_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["def_m_interval"] = function $def_m_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("m_pos", false, [], null, this["m_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("m_pos", false, [], null, this["m_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("m_pos", false, [], null, this["m_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["def_p_interval"] = function $def_p_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("p_pos", false, [], null, this["p_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("p_pos", false, [], null, this["p_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("p_pos", false, [], null, this["p_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["def_r_interval"] = function $def_r_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("r_pos", false, [], null, this["r_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("r_pos", false, [], null, this["r_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("r_pos", false, [], null, this["r_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.Interval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["def_c_interval"] = function $def_c_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("c_pos", false, [], null, this["c_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("c_pos", false, [], null, this["c_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.BaseInterval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("c_pos", false, [], null, this["c_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.BaseOffsetInterval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["def_n_interval"] = function $def_n_interval() {
    var start, end, start;
    return this._atomic(function() {
        return this._rule("n_pos", false, [], null, this["n_pos"]) && (start = this._getIntermediate(), true) && this._match("_") && this._rule("n_pos", false, [], null, this["n_pos"]) && (end = this._getIntermediate(), true) && this._exec(elements.BaseInterval({
            start: start,
            end: end
        }));
    }) || this._atomic(function() {
        return this._rule("n_pos", false, [], null, this["n_pos"]) && (start = this._getIntermediate(), true) && this._exec(elements.BaseOffsetInterval({
            start: start,
            end: elements.deepcopy(start)
        }));
    });
};

HGVS.prototype["c_pos"] = function $c_pos() {
    return this._atomic(function() {
        return this._rule("def_c_pos", false, [], null, this["def_c_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_c_pos", false, [], null, this["def_c_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["g_pos"] = function $g_pos() {
    return this._atomic(function() {
        return this._rule("def_g_pos", false, [], null, this["def_g_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_g_pos", false, [], null, this["def_g_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["m_pos"] = function $m_pos() {
    return this._atomic(function() {
        return this._rule("def_m_pos", false, [], null, this["def_m_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_m_pos", false, [], null, this["def_m_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["n_pos"] = function $n_pos() {
    return this._atomic(function() {
        return this._rule("def_n_pos", false, [], null, this["def_n_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_n_pos", false, [], null, this["def_n_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["p_pos"] = function $p_pos() {
    return this._atomic(function() {
        return this._rule("def_p_pos", false, [], null, this["def_p_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_p_pos", false, [], null, this["def_p_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["r_pos"] = function $r_pos() {
    return this._atomic(function() {
        return this._rule("def_r_pos", false, [], null, this["def_r_pos"]);
    }) || this._atomic(function() {
        var pos;
        return this._match("(") && this._rule("def_r_pos", false, [], null, this["def_r_pos"]) && (pos = this._getIntermediate(), true) && this._match(")") && this._exec(pos.setUncertain());
    });
};

HGVS.prototype["def_c_pos"] = function $def_c_pos() {
    return this._atomic(function() {
        var b, o;
        return this._rule("base", false, [], null, this["base"]) && (b = this._getIntermediate(), true) && this._rule("offset", false, [], null, this["offset"]) && (o = this._getIntermediate(), true) && this._exec(elements.BaseOffsetPosition({
            base: b,
            offset: o,
            datum: hgvs.enums.Datum.CDS_START
        }));
    }) || this._atomic(function() {
        var b, o;
        return this._match("*") && this._rule("num", false, [], null, this["num"]) && (b = this._getIntermediate(), true) && this._rule("offset", false, [], null, this["offset"]) && (o = this._getIntermediate(), true) && this._exec(elements.BaseOffsetPosition({
            base: b,
            offset: o,
            datum: hgvs.enums.Datum.CDS_END
        }));
    });
};

HGVS.prototype["def_g_pos"] = function $def_g_pos() {
    var pos;
    return (this._atomic(function() {
        return this._rule("num", false, [], null, this["num"]);
    }) || this._atomic(function() {
        return this._match("?") && this._exec(null);
    })) && (pos = this._getIntermediate(), true) && this._exec(elements.SimplePosition(pos));
};

HGVS.prototype["def_m_pos"] = function $def_m_pos() {
    var pos;
    return (this._atomic(function() {
        return this._rule("num", false, [], null, this["num"]);
    }) || this._atomic(function() {
        return this._match("?") && this._exec(null);
    })) && (pos = this._getIntermediate(), true) && this._exec(elements.SimplePosition(pos));
};

HGVS.prototype["def_n_pos"] = function $def_n_pos() {
    var b, o;
    return this._rule("base", false, [], null, this["base"]) && (b = this._getIntermediate(), true) && this._rule("offset", false, [], null, this["offset"]) && (o = this._getIntermediate(), true) && this._exec(elements.BaseOffsetPosition({
        base: b,
        offset: o,
        datum: hgvs.enums.Datum.SEQ_START
    }));
};

HGVS.prototype["def_p_pos"] = function $def_p_pos() {
    var aa, pos;
    return (this._atomic(function() {
        return this._rule("term13", false, [], null, this["term13"]);
    }) || this._atomic(function() {
        return this._rule("aa13", false, [], null, this["aa13"]);
    })) && (aa = this._getIntermediate(), true) && this._rule("num", false, [], null, this["num"]) && (pos = this._getIntermediate(), true) && this._exec(elements.AAPosition({
        base: pos,
        aa: aa_to_aa1(aa)
    }));
};

HGVS.prototype["def_r_pos"] = function $def_r_pos() {
    var b, o;
    return this._rule("base", false, [], null, this["base"]) && (b = this._getIntermediate(), true) && this._rule("offset", false, [], null, this["offset"]) && (o = this._getIntermediate(), true) && this._exec(elements.BaseOffsetPosition({
        base: b,
        offset: o,
        datum: hgvs.enums.Datum.SEQ_START
    }));
};

HGVS.prototype["fs"] = function $fs() {
    var n;
    return this._match("fs") && (this._atomic(function() {
        return this._rule("aa13_fs", false, [], null, this["aa13_fs"]);
    }) || this._atomic(function() {
        return this._exec(null);
    })) && (n = this._getIntermediate(), true) && this._exec(n);
};

HGVS.prototype["ext"] = function $ext() {
    var ext;
    return this._match("ext") && (this._atomic(function() {
        return this._rule("aa13_ext", false, [], null, this["aa13_ext"]);
    }) || this._atomic(function() {
        return this._exec(Ext(null, null));
    })) && (ext = this._getIntermediate(), true) && this._exec(ext);
};

HGVS.prototype["aa13_fs"] = function $aa13_fs() {
    var n;
    return this._rule("term13", false, [], null, this["term13"]) && this._rule("fsext_offset", false, [], null, this["fsext_offset"]) && (n = this._getIntermediate(), true) && this._exec(n);
};

HGVS.prototype["aa13_ext"] = function $aa13_ext() {
    return this._atomic(function() {
        var aat, n;
        return this._rule("term13", false, [], null, this["term13"]) && (aat = this._getIntermediate(), true) && this._rule("fsext_offset", false, [], null, this["fsext_offset"]) && (n = this._getIntermediate(), true) && this._exec(Ext(aat, n));
    }) || this._atomic(function() {
        var aat, n;
        return (this._atomic(function() {
            return this._rule("aa13", false, [], null, this["aa13"]);
        }) || this._atomic(function() {
            return this._exec(null);
        })) && (aat = this._getIntermediate(), true) && this._rule("nnum", false, [], null, this["nnum"]) && (n = this._getIntermediate(), true) && this._exec(Ext(aat, n));
    });
};

HGVS.prototype["fsext_offset"] = function $fsext_offset() {
    return this._atomic(function() {
        return this._rule("num", false, [], null, this["num"]);
    }) || this._match("?") || this._atomic(function() {
        return this._exec(null);
    });
};

HGVS.prototype["dna_seq"] = function $dna_seq() {
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("dna", false, [], null, this["dna"]);
            });
        });
    }, true);
};

HGVS.prototype["rna_seq"] = function $rna_seq() {
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("rna", false, [], null, this["rna"]);
            });
        });
    }, true);
};

HGVS.prototype["aat13_seq"] = function $aat13_seq() {
    return this._atomic(function() {
        return this._list(function() {
            return this._rule("aat3_seq", false, [], null, this["aat3_seq"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._rule("aat1_seq", false, [], null, this["aat1_seq"]);
        }, true);
    });
};

HGVS.prototype["aat1_seq"] = function $aat1_seq() {
    return this._atomic(function() {
        return this._list(function() {
            return this._rule("term1", false, [], null, this["term1"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._many(function() {
                return this._atomic(function() {
                    return this._rule("aa1", false, [], null, this["aa1"]);
                });
            }) && this._optional(function() {
                return this._rule("term1", false, [], null, this["term1"]);
            });
        }, true);
    });
};

HGVS.prototype["aat3_seq"] = function $aat3_seq() {
    return this._atomic(function() {
        return this._list(function() {
            return this._rule("term3", false, [], null, this["term3"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._many(function() {
                return this._atomic(function() {
                    return this._rule("aa3", false, [], null, this["aa3"]);
                });
            }) && this._optional(function() {
                return this._rule("term3", false, [], null, this["term3"]);
            });
        }, true);
    });
};

HGVS.prototype["aa13_seq"] = function $aa13_seq() {
    return this._atomic(function() {
        return this._list(function() {
            return this._rule("aa3_seq", false, [], null, this["aa3_seq"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._rule("aa1_seq", false, [], null, this["aa1_seq"]);
        }, true);
    });
};

HGVS.prototype["aa1_seq"] = function $aa1_seq() {
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("aa1", false, [], null, this["aa1"]);
            });
        });
    }, true);
};

HGVS.prototype["aa3_seq"] = function $aa3_seq() {
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("aa3", false, [], null, this["aa3"]);
            });
        });
    }, true);
};

HGVS.prototype["aa1"] = function $aa1() {
    var x;
    return (this._match("A") || this._match("C") || this._match("D") || this._match("E") || this._match("F") || this._match("G") || this._match("H") || this._match("I") || this._match("K") || this._match("L") || this._match("M") || this._match("N") || this._match("P") || this._match("Q") || this._match("R") || this._match("S") || this._match("T") || this._match("V") || this._match("W") || this._match("Y") || this._match("B") || this._match("Z") || this._match("X") || this._match("U")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["aa13"] = function $aa13() {
    return this._atomic(function() {
        return this._rule("aa3", false, [], null, this["aa3"]);
    }) || this._atomic(function() {
        return this._rule("aa1", false, [], null, this["aa1"]);
    });
};

HGVS.prototype["aa3"] = function $aa3() {
    return this._match("Ala") || this._match("Cys") || this._match("Asp") || this._match("Glu") || this._match("Phe") || this._match("Gly") || this._match("His") || this._match("Ile") || this._match("Lys") || this._match("Leu") || this._match("Met") || this._match("Asn") || this._match("Pro") || this._match("Gln") || this._match("Arg") || this._match("Ser") || this._match("Thr") || this._match("Val") || this._match("Trp") || this._match("Tyr") || this._match("Asx") || this._match("Glx") || this._match("Xaa") || this._match("Sec");
};

HGVS.prototype["aat1"] = function $aat1() {
    return this._atomic(function() {
        return this._rule("term1", false, [], null, this["term1"]);
    }) || this._atomic(function() {
        return this._rule("aa1", false, [], null, this["aa1"]);
    });
};

HGVS.prototype["aat13"] = function $aat13() {
    return this._atomic(function() {
        return this._rule("aat3", false, [], null, this["aat3"]);
    }) || this._atomic(function() {
        return this._rule("aat1", false, [], null, this["aat1"]);
    });
};

HGVS.prototype["aat3"] = function $aat3() {
    return this._atomic(function() {
        return this._rule("term3", false, [], null, this["term3"]);
    }) || this._atomic(function() {
        return this._rule("aa3", false, [], null, this["aa3"]);
    });
};

HGVS.prototype["dna"] = function $dna() {
    return this._rule("dna_iupac", false, [], null, this["dna_iupac"]);
};

HGVS.prototype["dna_iupac"] = function $dna_iupac() {
    var x;
    return (this._match("A") || this._match("C") || this._match("G") || this._match("T") || this._match("R") || this._match("Y") || this._match("M") || this._match("K") || this._match("W") || this._match("S") || this._match("B") || this._match("D") || this._match("H") || this._match("V") || this._match("N") || this._match("a") || this._match("c") || this._match("g") || this._match("t") || this._match("r") || this._match("y") || this._match("m") || this._match("k") || this._match("w") || this._match("s") || this._match("b") || this._match("d") || this._match("h") || this._match("v") || this._match("n")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["na_iupac"] = function $na_iupac() {
    var x;
    return (this._match("A") || this._match("C") || this._match("G") || this._match("T") || this._match("U") || this._match("R") || this._match("Y") || this._match("M") || this._match("K") || this._match("W") || this._match("S") || this._match("B") || this._match("D") || this._match("H") || this._match("V") || this._match("N") || this._match("a") || this._match("c") || this._match("g") || this._match("t") || this._match("u") || this._match("r") || this._match("y") || this._match("m") || this._match("k") || this._match("w") || this._match("s") || this._match("b") || this._match("d") || this._match("h") || this._match("v") || this._match("n")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["rna"] = function $rna() {
    return this._rule("rna_iupac", false, [], null, this["rna_iupac"]);
};

HGVS.prototype["rna_iupac"] = function $rna_iupac() {
    var x;
    return (this._match("A") || this._match("C") || this._match("G") || this._match("U") || this._match("R") || this._match("Y") || this._match("M") || this._match("K") || this._match("W") || this._match("S") || this._match("B") || this._match("D") || this._match("H") || this._match("V") || this._match("N") || this._match("a") || this._match("c") || this._match("g") || this._match("u") || this._match("r") || this._match("y") || this._match("m") || this._match("k") || this._match("w") || this._match("s") || this._match("b") || this._match("d") || this._match("h") || this._match("v") || this._match("n")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["term1"] = function $term1() {
    var x;
    return (this._match("X") || this._match("*")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["term13"] = function $term13() {
    return this._atomic(function() {
        return this._rule("term3", false, [], null, this["term3"]);
    }) || this._atomic(function() {
        return this._rule("term1", false, [], null, this["term1"]);
    });
};

HGVS.prototype["term3"] = function $term3() {
    return this._match("Ter");
};

HGVS.prototype["base"] = function $base() {
    return this._rule("snum", false, [], null, this["snum"]);
};

HGVS.prototype["nnum"] = function $nnum() {
    var x;
    return this._list(function() {
        return this._match("-") && this._rule("num", false, [], null, this["num"]);
    }, true) && (x = this._getIntermediate(), true) && this._exec(parseInt(x));
};

HGVS.prototype["num"] = function $num() {
    var x;
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("digit", false, [], null, this["digit"]);
            });
        });
    }, true) && (x = this._getIntermediate(), true) && this._exec(parseInt(x));
};

HGVS.prototype["offset"] = function $offset() {
    return this._atomic(function() {
        return this._rule("snum", false, [], null, this["snum"]);
    }) || this._atomic(function() {
        return this._exec(0);
    });
};

HGVS.prototype["pm"] = function $pm() {
    var x;
    return (this._match("-") || this._match("+")) && (x = this._getIntermediate(), true) && this._exec(x);
};

HGVS.prototype["snum"] = function $snum() {
    var x;
    return this._list(function() {
        return this._optional(function() {
            return this._rule("pm", false, [], null, this["pm"]);
        }) && this._rule("num", false, [], null, this["num"]);
    }, true) && (x = this._getIntermediate(), true) && this._exec(parseInt(x));
};

HGVS.prototype["letterOrDigit"] = function $letterOrDigit() {
    return this._atomic(function() {
        return this._list(function() {
            return this._rule("letter", false, [], null, this["letter"]);
        }, true);
    }) || this._atomic(function() {
        return this._list(function() {
            return this._rule("digit", false, [], null, this["digit"]);
        }, true);
    });
};

HGVS.prototype["accn"] = function $accn() {
    return this._list(function() {
        return this._rule("letter", false, [], null, this["letter"]) && this._many(function() {
            return this._atomic(function() {
                return this._rule("letterOrDigit", false, [], null, this["letterOrDigit"]);
            });
        }) && this._optional(function() {
            return this._match("_") && this._many(function() {
                return this._atomic(function() {
                    return this._rule("letterOrDigit", false, [], null, this["letterOrDigit"]);
                });
            });
        }) && this._optional(function() {
            return this._match(".") && this._many(function() {
                return this._atomic(function() {
                    return this._rule("digit", false, [], null, this["digit"]);
                });
            });
        });
    }, true);
};