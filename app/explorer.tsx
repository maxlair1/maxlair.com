import * as React from 'react';
import TreeView from '@root/components/TreeView';
import Card from '@root/components/Card';

export default function Explorer(): React.ReactNode {
    return (
        <>
            <TreeView defaultValue={true} isRoot title="Animal Kingdom">
                <TreeView defaultValue={true} title="Chordata">
                <TreeView defaultValue={true} title="Mammalia">
                    <TreeView defaultValue={true} title="Primates">
                    <TreeView title="Hominidae.csv" isFile />
                    <TreeView title="Cercopithecidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Carnivora">
                    <TreeView title="Felidae.csv" isFile />
                    <TreeView title="Canidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Cetacea">
                    <TreeView title="Delphinidae.csv" isFile />
                    <TreeView title="Balaenidae.csv" isFile />
                    </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Mammalia Rejects"></TreeView>
                <TreeView defaultValue={true} title="Aves">
                    <TreeView defaultValue={true} title="Passeriformes">
                    <TreeView title="Corvidae.csv" isFile />
                    <TreeView title="Fringillidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Accipitriformes">
                    <TreeView title="Accipitridae.csv" isFile />
                    <TreeView title="Pandionidae.csv" isFile />
                    </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Reptilia">
                    <TreeView defaultValue={true} title="Squamata">
                    <TreeView title="Viperidae.csv" isFile />
                    <TreeView title="Iguanidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Testudines">
                    <TreeView title="Cheloniidae.csv" isFile />
                    <TreeView title="Testudinidae.csv" isFile />
                    </TreeView>
                </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Arthropoda">
                <TreeView defaultValue={true} title="Insecta">
                    <TreeView defaultValue={true} title="Coleoptera">
                    <TreeView title="Coccinellidae.csv" isFile />
                    <TreeView title="Scarabaeidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Diptera">
                    <TreeView title="Culicidae.csv" isFile />
                    <TreeView title="Syrphidae.csv" isFile />
                    </TreeView>
                </TreeView>
                <TreeView defaultValue={true} title="Arachnida">
                    <TreeView defaultValue={true} title="Araneae">
                    <TreeView title="Salticidae.csv" isFile />
                    <TreeView title="Theraphosidae.csv" isFile />
                    </TreeView>
                    <TreeView defaultValue={true} title="Scorpiones">
                    <TreeView title="Buthidae.csv" isFile />
                    <TreeView title="Scorpionidae.csv" isFile />
                    </TreeView>
                </TreeView>
                </TreeView>
            </TreeView>
        </>

    );
}